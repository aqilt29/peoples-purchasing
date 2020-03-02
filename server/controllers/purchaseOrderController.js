const mongoose = require('mongoose');
const Request = require('../../db/models/request');
const PurchaseOrder = require('../../db/models/purchaseOrder');

module.exports = {
  getAllPurchaseOrders: async (req, res) => {
    console.log('get all pos')
    let allPOs

    try {
      allPOs = await PurchaseOrder.find()
        .populate('user')
        .populate('vendor')
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }

    res.status(200).send(allPOs)
  },

  createPurchaseOrder: async (req, res) => {
    const { body: newPoData } = req

    let poToSave;
    //  try to make a new PO
    try {
      poToSave = await new PurchaseOrder(newPoData)
    } catch (error) {
      console.error(error)
      return res.status(501).send(error)
    }


    let savedPo;
    //  try to save a new PO
    try {
      savedPo = await poToSave.save()
    } catch (error) {
      console.error(error)
      return res.status(502).send(error)
    }

    //  populate the PRs in the new PO
    console.log(newPoData.purchaseRequests)

    let poWithListOfReqs;
    try {
      poWithListOfReqs = await PurchaseOrder.findById(savedPo._id).populate('purchaseRequests')
      poWithListOfReqs.vendor = poWithListOfReqs.purchaseRequests[0].vendor;
      await poWithListOfReqs.save()
    } catch (error) {
      console.error(error)
      return res.status(503).send(error)
    }

    //  try to update all of the PRs in the list
    let prData;
    try {
      poWithListOfReqs.purchaseRequests.forEach(async ({ _id }) => {
        prData = await Request.findOneAndUpdate({ _id}, {
          hasPurchaseOrder: true,
          purchaseOrderId: savedPo._id
        }, { new: true })

        console.log(prData)
      })
    } catch (error) {
      console.error(error)
      return res.status(504).send(error)
    }

    res.status(201).send(poWithListOfReqs)
  },
};
