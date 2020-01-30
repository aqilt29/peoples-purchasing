const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  isTaxable: { type: Boolean, default: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  vendorPartNumber: String,
  internalPartNumber: String,
  quantity: { type: Number, required: true },
  requestByDate: { type: Date, required: true },
  isDirect: { type: Boolean, default: false },
  receivedQty: { type: Number, default: 0 }
});

module.exports = itemSchema;