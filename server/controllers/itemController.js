const path = require('path');
const mongoose = require('mongoose')
const Request = require('../../db/models/request');

module.exports = {
  getItemById: async (req, res) => {
    const { params: { id, docId } } = req

    let itemDetails
    try {
      const requestWithItem = await Request.findById(docId)
      itemDetails = await requestWithItem.items.id(id);

      console.log(itemDetails)
    } catch (error) {
      console.error(error)
      res.status(501).send(error)
    }


    res.status(200).send(itemDetails)
  },

  modifyItem: async (req, res) => {
    const { params: { id, docId }, body } = req;

    console.log(id, docId, body)

    res.status(201).send(body)
  },
}