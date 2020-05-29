const mongoose = require('mongoose');
const _ = require('lodash')
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const selectApprovalOrder = require('./utils/selectApprovalOrder');

const statuses = ['Pending', 'Approved', 'Denied', 'Error', 'Saved'];

const approverSchema = new Schema({
  email: String,
  isSent: Boolean,
  isApproved: Boolean,
  dateApproved: Date,
  dateSent: Date,
})

const requestSchema = new Schema({
  isDeleted: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  delegates: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  address: {
    shipTo: { type: String, required: true },
  },
  costCenter: { type: Number, required: true },
  submittedFor: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
    default: function() {
      if (!this.submittedFor) {
        console.log('default submitted for', this.user._id);
        return this.user._id;
      }
      return null;
    }
  }, //  one userId of someone with pmcoc submitted by defines routing rules
  entity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
  dateRequested: { type: Date, default: Date.now },
  businessNeed: { type: String, required: true },
  invoiceTotal: { type: Number, required: true },
  approverList: [{ type: approverSchema, required: true }],
  paymentTerms: { type: String, required: true },
  status: { type: String, default: 'Saved', enum: statuses },
  comments: String,
  reason: String,
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // person placing order
  shipVia: String,
  shippingTerms: String,
  items: [itemSchema],
  attachments: [String],
  hasPurchaseOrder: { type: Boolean, default: false },
  isBlanket: { type: Boolean, default: false },
  purchaseOrderId: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder' },
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
