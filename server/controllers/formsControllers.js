// import the request model
const mongoose = require('mongoose');
const Requisition = require('../../db/models/request');
const data = require('../../db/sampleRequest.js');

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

    const submitRequest = new Requisition(data)
    let saveData;

    try {
      console.log('Attempting to save document')
      saveData = await submitRequest.save()

    } catch (error) {
      return res.status(404).json(error)
    }

    res.status(201).json(saveData)
    // Create form needs to validate the data from the client
      //  if invalid
          //  send error to client
      //  if valid
      //  save document in db
      //  send message to QUEUE
      //  confirm success to client
    //res.send('TODO API Create: create form: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  updateForm: (req, res) => {
      res.send('TODO API UPDATE: update form: '+ JSON.stringify(req.params) + ' ' + req.path)
  },

  searchForms: (req, res) => {
      res.send(`TODO API SEARCH: ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} ${req.path}`)
  },
}
