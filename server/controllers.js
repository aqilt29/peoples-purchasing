const { Form } = require('../db/models');
const sampleDemoForm = require('../db/sampleDemoForm');
const createRequestHtmlDocument = require('./htmlBuilder');
const { createPdfFromHtmlFile } = require('./buildpdf');

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

        let uuid = null;

        try {
            console.log(`trying to create the html document, expect uuid`);
            uuid = await createRequestHtmlDocument(sampleDemoForm);
            console.log(`success uuid: ${uuid}`);

            try {
                console.log(`trying to create a pdf for ${uuid}`);
                const path = await createPdfFromHtmlFile(uuid)
                console.log(`successful pdf now at ${path}`)
                res.status(201).send(path)
                return
            } catch (error) {
                console.log(`failed to make pdf from ${uuid}`)
                res.status(501).send(error)
                return
            }

        } catch (error) {
            console.log(`failed to create ${error}`)
            console.log(error);
            res.status(501).send(error)
            return
        }
        
    }
}