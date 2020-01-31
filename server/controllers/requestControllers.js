const path = require('path');
const Request = require('../../db/models/request');
const aws = require('aws-sdk')

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
  getAllForms: (req, res) => {
    res.send('TODO API Create: get all forms: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getFormById: (req, res) => {
    res.send('TODO API Create: get form by id: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getFormsByUser: (req, res) => {
    res.send('TODO API Create: get forms by user: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  getFormsByStatus: (req, res) => {
    res.send('TODO API Create: get forms by status:' + JSON.stringify(req.params) + ' '+ req.path)
  },

  createForm: async (req, res) => {
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
      return res.status(404).json(error)

    }

    //  try to send message to queue
    try {
      console.log('sending message to queue')

      await sqs.sendMessage(queueParams('Approvals', saveData.id)).promise()

    } catch (error) {
      return res.status(404).json({ error, doc: saveData.id })

    }

    res.status(201).json(saveData);
  },

  updateForm: (req, res) => {
      res.send('TODO API UPDATE: update form: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  searchForms: (req, res) => {
      res.send(`TODO API SEARCH: ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${req.path}`)
  },
}
