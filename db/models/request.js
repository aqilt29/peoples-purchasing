const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');

const listOfEntities = [
  'Hero Oak',
  'Lean Green',
  'Monterey Ocean Grown',
  'Monterey Valley Pride',
  'New Patriot Holdings',
  'Oxford Properties',
  'People\'s Aviation',
  'People\'s First Choice',
  'People\'s LA',
  'People\'s Marketing Group',
  'People\'s Riverside',
  'People\'s WeHo',
  'Standard Hemp',
];

const requestSchema = new Schema({
  user: { type: String, required: true },
  entity: { type: String, required: true, enum: listOfEntities },
  dateRequested: { type: Date, default: Date.now },
  shipTo: { type: String, required: true },
  subtotal: { type: Number, required: true },
  freightCost: { type: Number, required: true, default: 0 },
  invoiceTotal: { type: Number, required: true },
  items: [itemSchema],
  vendorPhone: String,
  vendorEmail: String,
  comments: String,
});



module.exports = mongoose.model('Request', requestSchema)