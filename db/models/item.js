const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  description: { type: String, required: true },
  specialDetails: { type: String, required: true },
  expenseCategory: { type: String, required: true },
  price: { type: Number, required: true },
  // requestByDate: { type: String, required: true },
  unitOfMeasure: { type: String, default: 'ea' },
  link: { type: String, default: '#' },
  quantity: { type: Number, required: true },
  receivedQty: { type: Number, default: 0 },
  invoicedQty: { type: Number, default: 0 },
});


module.exports = itemSchema;
