const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hasW9: { type: Boolean, default: false },
  attn: String,
})

module.exports = mongoose.model('Vendor', vendorSchema);
