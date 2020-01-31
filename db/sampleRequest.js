// const requestSchema = new Schema({
//   user: { type: String, required: true },
//   entity: { type: String, required: true, enum: listOfEntities },
//   dateRequested: { type: Date, default: Date.now },
//   shipTo: { type: String, required: true },
//   subtotal: { type: Number, required: true },
//   freightCost: { type: Number, required: true, default: 0 },
//   invoiceTotal: { type: Number, required: true },
//   items: [itemSchema],
//   vendorPhone: String,
//   vendorEmail: String,
//   comments: String,
// });

module.exports = {
  user: 'aqil@pmcoc.com',
  entity: 'People\'s First Choice',
  shipTo: '22 EP',
  subtotal: 10000,
  invoiceTotal: '10000',
};
