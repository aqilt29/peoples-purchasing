const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const units = [
  'ea',
  'lbs',
  'kg',
]

const itemSchema = new Schema({
  vendorItemNumber: String,
  price: { type: Number, required: true },
  description: { type: String, required: true },
  link: String,
  vendorPartNumber: String,
  internalPartNumber: String,
  quantity: { type: Number, required: true },
  requestByDate: { type: Date, required: true },
  isDirect: { type: Boolean, default: false },
  receivedQty: { type: Number, default: 0 },
  unitOfMeasure: { type: String, enum: units },
  genLedger: String,
  classCode: String, //  needs ENUM
});


module.exports = itemSchema;
