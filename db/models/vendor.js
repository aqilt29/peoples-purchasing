const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, default: 'N/A' },
  website: String,
  address: {
    city: String,
    zipCode: String,
    street: String,
    state: String,
  },
  phoneNumber: { type: String, default: 'N/A' },
  hasW9: { type: Boolean, default: false },
  is1099: { type: Boolean, default: false },
  attn: String,
  isDeleted: { type: Boolean, default: false },
})

module.exports = mongoose.model('Vendor', vendorSchema);
