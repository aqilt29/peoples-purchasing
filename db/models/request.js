const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');

const statuses = ['Pending', 'Approved', 'Denied', 'Error'];

const requestSchema = new Schema({
  user: {
    email: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  delegates: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  address: {
    shipTo: { type: String, required: true },
    billTo: { type: String, required: true },
  },
  submittedFor: { type: String, required: true }, //  one email of someone with pmcoc submitted by defines routing rules
  entity: {
    name: { type: String, required: true },
    businessUnit: { type: String, required: true },
  },
  dateRequested: { type: Date, default: Date.now },
  businessNeed: { type: String, required: true },
  invoiceTotal: { type: Number, required: true },
  approverList: { type: Array, required: true },
  paymentTerms: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: statuses },
  comments: String,
  buyer: String, // email address of person placing order
  shipVia: String,
  shippingTerms: String,
  items: [itemSchema],
});




//  assign approvers list and record
// requestSchema.pre('validate', { document: true }, function(next) {
//   if (this.approverList.length < 1) {

//     let listName = selectApprovalOrder(this)

//     this.approverList = listName

//     console.log(listName)
//   }
//   next()
// })


module.exports = mongoose.model('Request', requestSchema);
