const path = require('path');
const mongoose = require('mongoose')
const Request = require('../../db/models/request');
const Entity = require('../../db/models/entity');
const User = require('../../db/models/user');
const aws = require('aws-sdk')


//  configure aws sdk with credentials for user
aws.config.loadFromPath(path.resolve(__dirname, '../../aws_config.json'));

//  instance of SQS class
const sqs = new aws.SQS();

const s3 = new aws.S3();

// How to use promises with aws
// sqs.listQueues().promise().then(console.log)
console.log(process.env.QUEUE_URL)

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
      .where('isDeleted')
      .ne(true)
      .populate('user')
      .populate('entity')
      .populate('vendor')
      .populate('buyer')
      .sort({ dateRequested: 'desc'})

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
        .populate('buyer')

    } catch (error) {
      res.status(404).send(error)
    }

    res.status(200).send(data)
  },

  getRequestsByUser: async (req, res) => {
    const { params: { userId }, query: { email } } = req;

    const data = await Request.find()
      .or([{ user: userId }, { 'approverList.email': email }])
      .where('isDeleted').ne(true)
      .populate({ path: 'vendor', select: 'name -_id'})
      .populate({ path: 'entity', select: 'name -_id'})
      .sort({ dateRequested: 'desc'})

    res.send(data)

  },

  getRequestsByStatus: (req, res) => {
    res.send('TODO API Create: get requests by status:' + JSON.stringify(req.params) + ' '+ req.path)
  },

  createRequest: async (req, res) => {

    /**
     * To create a request, we need to
     * -  Apply the approval list
     * -  Save the entry
     *  - If entry is not valid, return error
     * -  Return the object ID for re-navigation
     */

    const newSelectApprovalOrder = async ({ entity, invoiceTotal }) => {
      const approverListToAdd = [];

      //  look up the entity
      const { approverList: { approverOne, approverTwo } } = await Entity.findById(entity);

      //  push appropriate approvers into array
      if (invoiceTotal > 250) approverListToAdd.push(approverOne);
      if (invoiceTotal > 2500) approverListToAdd.push(approverTwo);

      //  return the array
      return approverListToAdd;
    };


    const { body: requestAPIData } = req

    let submittedRequest;

    try {
      submittedRequest = await new Request(requestAPIData).save();

    } catch (error) {
      console.log('request cant be saved error:', error)
      return res.status(503).send(error)

    }


    if (submittedRequest.invoiceTotal < 251) {
      console.log('here')

      try {

        submittedRequest.status = 'Approved';
        submittedRequest.markModified('status');

        await submittedRequest.save();
        await sqs.sendMessage(queueParams(`sendApprovalNotifications`, submittedRequest.id)).promise()


        return res.status(201).send(submittedRequest)

      } catch (error) {
        console.log('request cannot be preapproved:', error)
        return res.status(504).send(error)
      }

    } else {
      console.log('applying approver list')
      //  Apply the approvalList
      try {
        submittedRequest.approverList = await newSelectApprovalOrder(submittedRequest);

        submittedRequest.markModified('approverList')
        await submittedRequest.save();


      } catch (error) {

        return res.status(502).send(error)
      }

    }

    res.status(201).send(submittedRequest)

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
    let sqsData;
    try {
      console.log('sending message to queue')

      sqsData = await sqs.sendMessage(queueParams(`sendApprovalEmails`, id)).promise()

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


    res.status(201).send(sqsData || {'empty': {}});
  },

  updateRequest: (req, res) => {
    res.send('TODO API UPDATE: update request: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  searchRequests: async (req, res) => {
    const { lookupId } = req.body;

    //  try to find the request by an id or partial
    console.log(lookupId)
    let requestResults;
    try {
      requestResults = await Request.find().$where(`this._id.str.match(/${lookupId}/i) && this.isDeleted !== true`)
      console.log(requestResults)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }

    res.status(201).send(requestResults)
  },

  approvePurchaseRequest: async (req, res) => {
    /**
     * This is supposed to approve a request
     * Input: request id
     * Effect: send to SQS to send approval notification
     * Output: request
     *
    */

    const { params: { id } } = req;

    const requestToUpdate = await Request.findById(id);

    if (requestToUpdate.status === 'Approved') {
      console.log('the request has already been approved')
      return res.status(203).send('already approved')
    }

    requestToUpdate.status = 'Approved';
    requestToUpdate.markModified('status');

    await requestToUpdate.save();
    await sqs.sendMessage(queueParams(`sendApprovalNotifications`, id)).promise()

    return res.status(201).send(requestToUpdate)
  },

  approveRequest: async (req, res) => {
    const { params: { id }, body: { params: { email, approverId } } } = req
    console.log(email, id, approverId, '<--- email, id, approverId, request is being approved')
    //  get the document
    const requestToUpdate = await Request.findById(id)

    if (requestToUpdate.status === 'Approved') {
      console.log('the request has already been approved')
      return res.status(203).send('already approved')
    }

    //  update the approval property on the list with timestamp
    console.log('update the approverList', requestToUpdate.approverList.id(approverId))
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

      console.log(i === (requestToUpdate.approverList.length - 1))
        if (i === (requestToUpdate.approverList.length - 1)) {
          console.log(i)

          // send message to queue to notify everyone the request is approved
          console.log('all emails sent and in loop', i, 'marking as approved')
          requestToUpdate.status = 'Approved';
          requestToUpdate.markModified('status');
          await requestToUpdate.save();
          await sqs.sendMessage(queueParams(`sendApprovalNotifications`, id)).promise()
      }
    }

    //  return the updated document
    res.status(201).send(requestToUpdate)

  },

  denyRequest: async (req, res) => {
    const { params: { id }, body: { params: { approverId, reason = 'no reason given' } } } = req
    console.log('id', id, 'approverId', approverId, 'reason', reason )

    const requestToUpdate = await Request.findById(id)

    if (requestToUpdate.status === 'Denied') {
      return res.status(206).send('already denied')
    } else if (requestToUpdate.status === 'Approved') {
      return res.status(207).send('already approved')
    }

    if (approverId !== 'self') {
      //  update the approval property on the list
      try {
        requestToUpdate.approverList.id(approverId).isApproved = false
      } catch (error) {
        console.log(error)
        console.log(requestToUpdate.approverList)
        return res.status(501).send(error)
      }

      //  save the document
      requestToUpdate.markModified('approverList')
    }

    //  set a reason for denial property
    console.log('set reason', reason)
    requestToUpdate.reason = reason
    requestToUpdate.markModified('reason')

    try {

      await requestToUpdate.save()
    } catch (error) {
      console.log(error)
    }

    try {
      await sqs.sendMessage(queueParams(`sendDeniedNotifications`, id)).promise()
    } catch (error) {
      return res.status(506).send(error)
    }

    res.status(201).send(requestToUpdate)
  },

  uploadDocument: async (req, res) => {
    const { locationURL } = req.body;
    const { id } = req.params;

    console.log('document location is: ', locationURL);

    if (!locationURL) {
      return res.status(405).send('no URL path provided');
    }

    let requestToModify;
    // try to lookup the document based on id
    try {
      requestToModify = await Request.findById(id);
    } catch (error) {
      return res.status(404).send(error)
    }

    console.log(requestToModify.attachments);

    requestToModify.attachments.push(locationURL);
    requestToModify.markModified('attachments')

    //  try to save the modified document
    try {
      await requestToModify.save()
    } catch (error) {
      return res.status(506).send(error)
    }

    res.status(204).send(id);
  },

  getApprovedRequests: async (req, res) => {

    res.status(200).send(`api todo get only approved requests`)
  },

  getApprovedRequestsWithoutPo: async (req, res) => {
    const { lookupId } = req.body;

    console.log(lookupId)

    let purchaseReqs;

    try {
      purchaseReqs = await Request.find()
        .and([{ status: 'Approved' }, { hasPurchaseOrder: false }]) //  ({ status: 'Approved' }).where({ isApproved: true })
        .$where(`this._id.str.match(/${lookupId}/i)`)

        console.log(purchaseReqs)
    } catch (error) {
      console.error(error)
      return res.status(505).json(error)
    }

    res.status(200).send(purchaseReqs)
  },
}
