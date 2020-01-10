const { Form } = require('../db/models');
const sampleData = require('../db/sampleForm');

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
    }
}