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
    freightCost: { type: Number, required: true },
    invoiceTotal: { type: Number, required: true },
    items: [itemSchema],
    vendorPhone: String,
    vendorEmail: String,
});


const demoItemSchema = new Schema({
    vendorItemNumber: String,
    description: String,
    link: String,
    quantity: Number,
    unitPrice: Number,
    unitType: String,
    extPrice: Number,
})

const demoFormSchema = new Schema({
    requestor: String,
    dateCreated: { type: Date, default: Date.now },
    shipTo: String,
    vendorEmail: String,
    vendorPhone: String,
    requestingEntity: String,
    freightCost: Number,
    invoiceTotal: Number,
    subtotal: Number,
    items: [demoItemSchema],
    pr_form_id: String,
})

module.exports = {
    itemSchema,
    formSchema,
    demoItemSchema,
    demoFormSchema,
};
