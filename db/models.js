const mongoose = require('mongoose');
const { formSchema, itemSchema } = require('./schemas');

const attachModels = async connection => {
    try {
        console.log('Models Attaching');
        const Form = connection.model('Form', formSchema);
        const Item = connection.model('Item', itemSchema);
        console.log('Models Attached');

        return { Form, Item };
    } catch (error) {
        console.log(`Error has occured ${error}`);

        return null;
    };
};

module.exports = attachModels;
