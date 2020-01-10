const { formSchema, itemSchema, demoFormSchema, demoItemSchema } = require('./schemas');
const mongoose = require('mongoose');

const Form = mongoose.model('Form', formSchema);
const Item = mongoose.model('Item', itemSchema);
const DemoForm = mongoose.model('DemoForm', demoFormSchema);
const DemoItem = mongoose.model('DemoItem', demoItemSchema);

module.exports = {
    Form,
    Item,
    DemoForm,
    DemoItem,
};
