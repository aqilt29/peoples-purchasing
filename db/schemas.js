//  write whatever a form entry is here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    isTaxable: { type: Boolean, default: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    vendorPartNumber: String,
    internalPartNumber: String,
    quantity: { type: Number, required: true },  
});

const formSchema = new Schema({
    requestor: { type: String, required: true },
    department: { type: String, required: true },
    requestingEntity: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    shipTo: { type: String, required: true },
    subtotal: { type: Number, required: true },
    frieghtCost: { type: Number, required: true },
    invoiceTotal: { type: Number, required: true },
    items: [itemSchema],
    vendor: String,
});

module.exports = {
    itemSchema,
    formSchema,
};
