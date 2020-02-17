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
}
