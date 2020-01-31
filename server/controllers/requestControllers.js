// import the request model
const mongoose = require('mongoose');
const Request = require('../../db/models/request');
const data = require('../../db/sampleRequest.js');
const aws = require('aws-sdk')

const sqs = new aws.SQS();

sqs.listQueues((err, data) => console.log(err, data))

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


    res.status(201).json(saveData);
  },

  updateForm: (req, res) => {
      res.send('TODO API UPDATE: update form: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  searchForms: (req, res) => {
      res.send(`TODO API SEARCH: ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${req.path}`)
  },
}
