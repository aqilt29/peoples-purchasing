// Initiate db connection

const mongoose = require('mongoose');
const attachModels = require('./models');

const connectDb = async () => {
    try {
        console.log('Connecting to DB')
        console.log(process.env.DB_HOST)
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/purchasing`, {
            useNewUrlParser: true,
            auth: { authSource: 'admin'},
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            pass: process.env.MONGO_INITDB_ROOT_PASSWORD, 
        });

        const { Form, Item } = await attachModels(mongoose.connection);
        return { Form, Item};
    } catch (error) {
        console.log(`Error on connection to DB ${error}`);
    }
};

module.exports = connectDb;
