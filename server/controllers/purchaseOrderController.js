const mongoose = require('mongoose');
const PurchaseOrder = require('../../db/models/purchaseOrder');

module.exports = {
  getAllPurchaseOrders: async (req, res) => {
    res.status(200).send(`API TODO`)
  },

  createPurchaseOrder: async (req, res) => {
    res.status(201).send(`API TODO`)
  },
};
