const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const listOfEntities = require('./utils/listOfEntities');
const selectApprovalOrder = require('./utils/selectApprovalOrder');

const requestSchema = new Schema({
  user: { type: String, required: true },
  entity: { type: String, required: true, enum: listOfEntities },
  dateRequested: { type: Date, default: Date.now },
  shipTo: { type: String, required: true },
  subtotal: { type: Number, required: true },
  freightCost: { type: Number, required: true, default: 0 },
  invoiceTotal: { type: Number, required: true },
  items: [itemSchema],
  vendorPhone: String,
  vendorEmail: String,
  comments: String,
  approverList: { type: Array, required: true }
});


//  assign approvers list and record
requestSchema.pre('validate', { document: true }, function(next) {
  if (this.approverList.length < 1) {

    let listName = selectApprovalOrder(this)

    this.approverList = listName

    console.log(listName)
  }
  next()
})


module.exports = mongoose.model('Request', requestSchema);
