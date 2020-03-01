const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statuses = ['Pending', 'Cancelled', 'Error', 'Closed'];

const PurchaseOrderSchema = new Schema({
  isDeleted: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseRequests: [
    { type: Schema.Types.ObjectId, ref: 'Request', required: true }
  ],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date,
  status: { type: String, default: 'Saved', enum: statuses },
  attachments: [String]
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
