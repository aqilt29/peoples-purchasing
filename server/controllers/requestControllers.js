const path = require('path');
const mongoose = require('mongoose')
const Request = require('../../db/models/request');
const User = require('../../db/models/user');
const aws = require('aws-sdk')
const _ = require('lodash');

//  configure aws sdk with credentials for user
aws.config.loadFromPath(path.resolve(__dirname, '../../aws_config.json'));

//  instance of SQS class
const sqs = new aws.SQS();

const s3 = new aws.S3();

// How to use promises with aws
// sqs.listQueues().promise().then(console.log)

const queueParams = (task, documentId) => ({
  QueueUrl: process.env.QUEUE_URL,
  MessageBody: `${task}`,
  MessageAttributes: {
    'documentId': {
      DataType: 'String',
      StringValue: documentId,
    }
  },
})

module.exports = {
  getAllRequests: async (req, res) => {
    let data;

    try {
      data = await Request.find()

    } catch (error) {
      res.status(404).send(error)
    }

    res.status(200).send(data)
  },

  getRequestById: async (req, res) => {
    let data;
    const { params: { id } } = req;
    console.log(id)

    try {
      data = await Request.findById(id)
        .populate('vendor')
        .populate('user')
        .populate('entity')
        .populate('submittedFor')

    } catch (error) {
      res.status(404).send(error)
    }

    res.status(200).send(data)
  },

  getRequestsByUser: async (req, res) => {
    const { params: { userId }, query: { email } } = req;

    const data = await Request.find()
      .or([{ user: userId }, { submittedFor: userId }, { 'approverList.email': email }])
      .where('user != submittedFor')
      .where('isDeleted').ne(true)
      .populate({ path: 'vendor', select: 'name -_id'})
      .populate({ path: 'submittedFor', select: 'firstName lastName -_id'})
      .sort({ dateRequested: 'desc'})

    res.send(data)

  },

  getRequestsByStatus: (req, res) => {
    res.send('TODO API Create: get requests by status:' + JSON.stringify(req.params) + ' '+ req.path)
  },

  createRequest: async (req, res) => {
    //  get the document from the body
    const { body } = req;
    console.log(body, '<---- body')
    //  create document model

    console.log(body.editedId, '<--- edited id')

    const submitRequest = new Request(body)
    let saveData;

    console.log('this is submittedFor', submitRequest.submittedFor)

    //  try to get the cost center for the submitted for.
    try {
      let { costCenter } = await User.findById(submitRequest.submittedFor);
      console.log(costCenter, "<--- in controller")

      submitRequest.set('costCenter', costCenter)
    } catch (error) {

      console.log(error)
      return res.status(501).json(error)
    }

    //  try to save to database
    try {
      console.log('Attempting to save document', submitRequest.submittedFor)
      saveData = await submitRequest.save()
      console.log(saveData)
    } catch (error) {
      console.log(error)
      return res.status(502).json(error)

    }

    console.log('Document Saved!')

    //  try to mark the old one as deleted if it is an edit
    if (body.editedId) {
      try {
        const { editedId } = body;
        const requestToDelete = await Request.findById(editedId)
        requestToDelete.isDeleted = true;
        await requestToDelete.save()
        console.log(requestToDelete, '<-- we are deleting this one')
        console.log(editedId, '<--- this was deleted')
      } catch (error) {
        console.log(error)
        return res.status(504).json(error)
      }
    }

    //  try to populate the related data to send back

    let dataToReturn;
    try {
      dataToReturn = await Request.findById(saveData._id)
        .populate('user')
        .populate('submittedFor')
        .populate('entity')
        .populate('vendor')

    } catch (error) {
      console.log(error)
      return res.status(503).json(error)
    }

    res.status(201).json(dataToReturn);
  },

  routeRequestForApproval: async (req, res) => {
    const { params: { id } } = req;

    let requestToApprove;

    //  try to lookup the document to route
    try {
      console.log(`looking up request with id: ${id}`)
      requestToApprove = await Request.findById(id);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error, doc: id })

    }

    //  try to send message to queue
    try {
      console.log('sending message to queue')

      await sqs.sendMessage(queueParams(`sendApprovalEmails`, id)).promise()

    } catch (error) {
      return res.status(500).json({ error, doc: id })

    }

    //  try to update the request status to pending
    try {
      await requestToApprove.set('status', 'Pending');
      await requestToApprove.save();

    } catch (error) {
      return res.status(500).json({ error, doc: id })

    }


    res.status(201).send(requestToApprove);
  },

  updateRequest: (req, res) => {
    res.send('TODO API UPDATE: update request: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  searchRequests: (req, res) => {
    res.send(`TODO API SEARCH: ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${req.path}`)
  },

  approveRequest: async (req, res) => {
    const { params: { id }, body: { params: { email, approverId } } } = req
    console.log(email, id, approverId)
    //  get the document
    const requestToUpdate = await Request.findById(id)

    if (requestToUpdate.status === 'Approved') {
      return res.status(203).send('already approved')
    }

    //  update the approval property on the list with timestamp
    requestToUpdate.approverList.id(approverId).isApproved = true
    requestToUpdate.approverList.id(approverId).set('dateApproved', Date.now())

    //  save the document
    requestToUpdate.markModified('approverList')
    await requestToUpdate.save()

    //  check if theres more approvals to do
    for (let i = 0; i < requestToUpdate.approverList.length; i++) {
      //  if yes
      if (!requestToUpdate.approverList[i].isSent) {
        console.log('more emails to send')
        //  send message to queue to email out approvals
        try {
          console.log('attempting to contact queue')
          await sqs.sendMessage(queueParams(`sendApprovalEmails`, id)).promise()
        } catch (error) {
          return res.status(500).json(error)
        }
        break;
      }

      // else
      // send message to queue to notify everyone the request is approved
      console.log('all emails sent and in loop', i, 'marking as approved')
      requestToUpdate.status = 'Approved';
      requestToUpdate.markModified('status');
      await requestToUpdate.save();
      await sqs.sendMessage(queueParams(`sendApprovalNotifications`, id)).promise()
    }



    //  return the updated document
    res.status(201).send(requestToUpdate)

  },

  denyRequest: async (req, res) => {
    const { params: { id }, body: { params: { email, approverId } } } = req
    console.log('id', id, 'email', email, 'approverId', approverId)

    const requestToUpdate = await Request.findById(id)

    if (requestToUpdate.status === 'Denied') {
      return res.status(203).send('already denied')
    }

    //  update the approval property on the list
    requestToUpdate.approverList.id(approverId).isApproved = false,

    //  save the document
    requestToUpdate.markModified('approverList')
    await requestToUpdate.save()

    try {
      await sqs.sendMessage(queueParams(`sendDeniedNotifications`, id)).promise()
    } catch (error) {
    }

    res.status(201).send(requestToUpdate)
  },

  uploadDocument: async (req, res) => {
    const { params: { id }, body: { fileName = 'test.txt' } } = req;

    //  lookup request based on id
    try {
      console.log(`find document on id ${id}`)
      const attachingDocument = await Request.findById(id);
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }

    const params = {
      Bucket: 'purchasing-attachments',
      Key: fileName,
      Expires: 14 * 24 * 3600,
    }

    // const signedUrlPut = s3.getSignedUrl('putObject', params)

    // console.log(signedUrlPut);

    res.status(201).send(signedUrlPut)
    //  receive file from the client
    //  upload file to S3
    //  add link under document.attachments.push(return url)
    //  save
    //  send document back to client
  },
}
