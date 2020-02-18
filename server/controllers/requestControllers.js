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
        .populate({ path: 'submittedFor', select: 'firstName lastName -_id'})

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
      return res.status(404).json(error)
    }

    //  try to save to database
    try {
      console.log('Attempting to save document', submitRequest.submittedFor)
      saveData = await submitRequest.save()

    } catch (error) {
      console.log(error)
      return res.status(404).json(error)

    }

    console.log('Document Saved!')
    //  try to send message to queue
    try {
      console.log('sending message to queue')

      await sqs.sendMessage(queueParams(`sendApprovalEmails`, saveData.id)).promise()

    } catch (error) {
      return res.status(404).json({ error, doc: saveData.id })

    }

    res.status(201).json(saveData);
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

    //  update the approval property on the list
    requestToUpdate.approverList.id(approverId).isApproved = true,

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
    }



    //  return the updated document
    res.status(201).send(requestToUpdate)

  },

  denyRequest: async (req, res) => {
    const { params: { id } } = req
    console.log('id', id)

    try {
      await sqs.sendMessage(queueParams(`sendDeniedNotifications`, id)).promise()
    } catch (error) {
      res.status(500).send(error)
    }

    res.send(`TODO API Deny: ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${req.path}`)
  }
}
