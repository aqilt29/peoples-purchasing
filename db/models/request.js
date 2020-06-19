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

const addressSchema = new Schema({
  address: { type: String, required: true },
  address2: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
})

const requestSchema = new Schema({
  referenceName: { type: String, default: 'noNameErr', required: true },
  entity: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  businessNeed: { type: String, required: true },
  shippingAddress: { type: addressSchema, required: true },
  address: {
    shipTo: { type: String },
  },
  costCenter: { type: Number, required: true },
  submittedFor: {
    type: Schema.Types.ObjectId, ref: 'User',
    default: function() {
      if (!this.submittedFor) {
        console.log('default submitted for', this.user._id);
        return this.user._id;
      }
      return null;
    }
  }, //  one userId of someone with pmcoc submitted by defines routing rules
  dateRequested: { type: Date, default: Date.now },
  invoiceTotal: { type: Number, required: true },
  approverList: [{ type: approverSchema, required: true }],
  status: { type: String, default: 'Saved', enum: statuses },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // person placing order
  items: [itemSchema],
  attachments: [String],
  hasPurchaseOrder: { type: Boolean, default: false },
  isBlanket: { type: Boolean, default: false },
  purchaseOrderId: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  delegates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isDeleted: { type: Boolean, default: false },
  // vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
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
