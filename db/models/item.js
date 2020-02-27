const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const units = [
  'EA',
  'LB',
  'GM',
  'MG',
  'KG',
  'ML',
  'L',
  'BOX',
  'CS',
  'PK',
  'HR',
  'BT',
  'FT',
  'RL',
  'GL',
  'M',
  'DZ',
]

const itemSchema = new Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  requestByDate: { type: String, required: true },
  unitOfMeasure: { type: String, enum: units, default: 'ea' },
  link: String,
  quantity: { type: Number, required: true },
  vendorItemNumber: String,
  vendorPartNumber: String,
  internalPartNumber: String,
  materialGroup: String,
  ledger: String,
  classCode: String, //  needs ENUM

  isDirect: { type: Boolean, default: false },
  receivedQty: { type: Number, default: 0 },
});


module.exports = itemSchema;
