const { Form } = require('../db/models');
const sampleDemoForm = require('../db/sampleDemoForm');
const createRequestHtmlDocument= require('../documentTemplates/htmlBuilder');

module.exports = {
    get: async (req, res) => {
        try {
            console.log('in get');
            const sendForm = await Form.find({})
            res.status(200).send(sendForm);

        } catch (error) {
            console.log(error);
            res.status(501).send(error);
        }
    },

    post: async (req, res) => {
        try {
            console.log('in post');
            
            const form1 = new Form(sampleData);
            
            const saveData = await form1.save();

            res.status(201).send(saveData);

        } catch (error) {
            console.log(error);
            res.status(501).send(error);
        }
    },

    patch: async (req, res) => {
        try {
            console.log(`trying to create the html document, expect uuid`);
            const uuid = await createRequestHtmlDocument(sampleDemoForm);
            console.log(`success uuid: ${uuid}`);
            
            res.status(201).send(uuid)
        } catch(error) {
            console.log(`failed to create html`)
            console.log(error);
            res.status(501).end()
        }
    }
}