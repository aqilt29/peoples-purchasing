const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statuses = ['Pending', 'Cancelled', 'Error', 'Closed'];

const PurchaseOrderSchema = new Schema({
  purchaseOrderId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseRequests: [
    { type: Schema.Types.ObjectId, ref: 'Request', required: true }
  ],
  dateOrdered: { type: Date, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
  status: { type: String, default: 'Pending', enum: statuses },
  attachments: [String]
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
