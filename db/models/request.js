const mongoose = require('mongoose');
const _ = require('lodash')
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const selectApprovalOrder = require('./utils/selectApprovalOrder');

const statuses = ['Pending', 'Approved', 'Denied', 'Error'];

const requestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  delegates: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  address: {
    shipTo: { type: String, required: true },
    billTo: { type: String, required: true },
  },
  costCenter: { type: Number, required: true },
  submittedFor: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
    default: function() {
      if (!this.submittedFor) {
        console.log('default submitted for');
        return this.user;
      }
      return null;
    }
  }, //  one userId of someone with pmcoc submitted by defines routing rules
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
  buyer: { type: String, required: true, default: 'LReth@pmcoc.com' }, // email address of person placing order
  shipVia: String,
  shippingTerms: String,
  items: [itemSchema],
});




//  assign approvers list and record
requestSchema.post('validate', { document: true }, async function() {
  if (this.approverList.length < 1) {
    let listName = selectApprovalOrder(this);

    this.approverList = _.cloneDeep(listName);

    console.log(listName, '<--- approval order');
  }
})


module.exports = mongoose.model('Request', requestSchema);
