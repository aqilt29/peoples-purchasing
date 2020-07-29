const mongoose = require('mongoose');
const _ = require('lodash')
const Schema = mongoose.Schema;
const itemSchema = require('./item');
const approverSchema = require('./approver')

const { selectApprovalOrder } = require('./utils/selectApprovalOrder');

const statuses = ['Pending', 'Approved', 'Denied', 'Error', 'Saved'];

const addressSchema = new Schema({
  address: { type: String, required: true },
  address2: String,
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
  dateRequested: { type: Date, default: Date.now },
  invoiceTotal: { type: Number, required: true },
  approverList: [{ type: approverSchema }],
  status: { type: String, default: 'Saved', enum: statuses },
  items: [itemSchema],
  attachments: [String],
  reason: String,
  hasPurchaseOrder: { type: Boolean, default: false },
  purchaseOrderId: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  delegates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Request', requestSchema);
