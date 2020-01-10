const { formSchema, itemSchema } = require('./schemas');
const mongoose = require('mongoose');

const Form = mongoose.model('Form', formSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = {
    Form,
    Item,
};
