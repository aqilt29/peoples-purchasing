const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const listOfEntities = require('./utils/listOfEntities');
const selectApprovalOrder = require('./utils/selectApprovalOrder');

const statuses = ['Pending', 'Approved', 'Denied', 'Error'];

const requestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  submittedFor: { type: String, required: true }, //  one email of someone with pmcoc submitted by defines routing rules
  entity: { type: String, required: true, enum: listOfEntities },
  dateRequested: { type: Date, default: Date.now },
  shipToAddress: { type: String, required: true },
  billToAddress: { type: String, required: true },
  businessNeed: { type: String, required: true },
  invoiceTotal: { type: Number, required: true },
  approverList: { type: Array, required: true },
  paymentTerms: { type: String, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  status: { type: String, default: 'Pending', enum: statuses },
  comments: String,
  buyer: String, // email address of person placing order
  shipVia: String,
  shippingTerms: String,
  items: [itemSchema],
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
