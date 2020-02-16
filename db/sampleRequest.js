// const requestSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   delegates: [
//     { type: Schema.Types.ObjectId, ref: 'User' }
//   ],
//   vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
//   address: {
//     shipTo: { type: String, required: true },
//     billTo: { type: String, required: true },
//   },
//   submittedFor: {
//     type: Schema.Types.ObjectId, ref: 'User', required: true,
//     default: function() {
//       if (!this.submittedFor) {
//         console.log('default submitted for');
//         return this.user;
//       }
//       return null;
//     }
//   }, //  one userId of someone with pmcoc submitted by defines routing rules
//   entity: {
//     name: { type: String, required: true },
//     businessUnit: { type: String, required: true },
//   },
//   dateRequested: { type: Date, default: Date.now },
//   businessUnit: { type: String, required: true },
//   businessNeed: { type: String, required: true },
//   invoiceTotal: { type: Number, required: true },
//   approverList: { type: Array, required: true },
//   paymentTerms: { type: String, required: true },
//   status: { type: String, default: 'Pending', enum: statuses },
//   comments: String,
//   buyer: { type: String, required: true, default: 'LReth@pmcoc.com' }, // email address of person placing order
//   shipVia: String,
//   shippingTerms: String,
//   items: [itemSchema],
// });

module.exports = {
  "user": "5e38a7cd2ad8f428cc0f416f",
  "vendor": "5e3d208f1e397669a2fc57a7",
  "address": {
    "shipTo": "22 Executive Park, Suite 250\tIrvine CA 92614",
    "billTo": "3843 S Bristol St # 607 Santa Ana CA 92704",
  },
  "entity": {
    "name": "Hero Oak",
    "businessUnit": "Manufacturing",
  },
  "paymentTerms": "Net 10",
  "approverList": ["aqil@pmcoc.com"],
  "businessNeed": "need it",
  "invoiceTotal": 1000,
};
