const path = require('path');
const Request = require('../../db/models/request');
const aws = require('aws-sdk')

//  configure aws sdk with credentials for user
aws.config.loadFromPath(path.resolve(__dirname, '../../aws_config.json'));

//  instance of SQS class
const sqs = new aws.SQS();

// How to use promises with aws
// sqs.listQueues().promise().then(console.log)

let counter = 0
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
  getAllRequests: (req, res) => {
    res.send('TODO API Create: get all requests: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getRequestById: (req, res) => {
    res.send('TODO API Create: get request by id: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getRequestsByUser: (req, res) => {
    res.send('TODO API Create: get requests by user: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getRequestsByStatus: (req, res) => {
    res.send('TODO API Create: get requests by status:' + JSON.stringify(req.params) + ' '+ req.path)
  },

  createRequest: async (req, res) => {
    //  get the document from the body
    const { body } = req;

    //  create document model
    const submitRequest = new Request(body)
    let saveData;

    //  try to save to database
    try {
      console.log('Attempting to save document')
      saveData = await submitRequest.save()

    } catch (error) {
      return res.status(400).json(error)

    }

    //  try to send message to queue
    try {
      console.log('sending message to queue')

      await sqs.sendMessage(queueParams(`sendApprovalEmails count ${counter++}`, saveData.id)).promise()

    } catch (error) {
      return res.status(400).json({ error, doc: saveData.id })

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
