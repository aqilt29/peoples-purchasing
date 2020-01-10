const { Form } = require('../db/models');


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
    }
}