// Initiate db connection

const mongoose = require('mongoose');
const attachModels = require('./models');

const connectDb = async => {
    try {
        console.log('Connecting to DB')
        await mongoose.connect(`mongdb://${process.env.DB_HOST}:27017/purchasing`, {
            useNewUrlParser: true,
            auth: { authSource: 'admin'},
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            pass: process.env.MONGO_INITDB_ROOT_PASSWORD, 
        });
        
        await attachModels(mongoose.connection);
    } catch (error) {
        console.log(`Error on connection to DB ${error}`);
    }
};

module.exports = connectDb;