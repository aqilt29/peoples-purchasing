const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const units = [
  'ea',
  'lbs',
  'kg',
  'g',
  'ft',
  'in',
  'm',
]

const itemSchema = new Schema({
  vendorItemNumber: String,
  vendorPartNumber: String,
  price: { type: Number, required: true },
  description: { type: String, required: true },
  link: String,
  internalPartNumber: String,
  quantity: { type: Number, required: true },
  requestByDate: { type: Date, required: true },
  isDirect: { type: Boolean, default: false },
  receivedQty: { type: Number, default: 0 },
  unitOfMeasure: { type: String, enum: units, default: 'ea' },
  generalLedger: String,
  classCode: String, //  needs ENUM
});


module.exports = itemSchema;
