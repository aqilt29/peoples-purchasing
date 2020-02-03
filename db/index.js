// Initiate db connection

const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        console.log('Connecting to DB')
        console.log(process.env.DB_HOST)

        return await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/purchasing`, {
            useNewUrlParser: true,
            auth: { authSource: 'admin'},
            useUnifiedTopology: true,
            useCreateIndex: true,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        });

    } catch (error) {
        console.log(`Error on connection to DB ${error}`);
    }
};

module.exports = connectDb;
