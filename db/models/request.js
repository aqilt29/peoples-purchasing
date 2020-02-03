const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const listOfEntities = require('./utils/listOfEntities');
const selectApprovalOrder = require('./utils/selectApprovalOrder');

const requestSchema = new Schema({
  user: { type: String, required: true },
  submittedFor: { type: String, required: true }, //  one email of someone with pmcoc submitted by defines routing rules
  entity: { type: String, required: true, enum: listOfEntities },
  dateRequested: { type: Date, default: Date.now },
  shipToAddress: { type: String, required: true },
  billToAddress: { type: String, required: true },
  invoiceTotal: { type: Number, required: true },
  items: [itemSchema],
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  comments: String,
  approverList: { type: Array, required: true },
  buyer: String, // email address of person placing order
  paymentTerms: { type: String, required: true },
  shipVia: String,
  shippingTerms: String,
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
