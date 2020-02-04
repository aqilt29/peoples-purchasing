// const requestSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   submittedFor: { type: String, required: true }, //  one email of someone with pmcoc submitted by defines routing rules
//   entity: { type: String, required: true, enum: listOfEntities },
//   dateRequested: { type: Date, default: Date.now },
//   shipToAddress: { type: String, required: true },
//   billToAddress: { type: String, required: true },
//   businessNeed: { type: String, required: true },
//   invoiceTotal: { type: Number, required: true },
//   approverList: { type: Array, required: true },
//   paymentTerms: { type: String, required: true },
//   vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' },
//   status: { type: String, default: 'Pending', enum: statuses },
//   comments: String,
//   buyer: String, // email address of person placing order
//   shipVia: String,
//   shippingTerms: String,
//   items: [itemSchema],
// });

module.exports = {
  "user": "aqil@pmcoc.com",
  "entity": "People\"s First Choice",
  "shipTo": "22 EP",
  "subtotal": 10000,
  "invoiceTotal": "10000",
};
