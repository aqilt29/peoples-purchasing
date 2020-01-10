require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('../db');

const app = express();

const createServer = async PORT => {
    // first connect to the DB
    try {
        console.log(`Establish DB connection`);
        await connectDb();
        
    } catch (error) {
        console.log(`Error in DB connection ${error}`)
    }

    try {
        //  try to start server
        await app.listen(PORT)

    } catch (error) {
        console.log(`App is now listening on PORT ${PORT}`)
    }

}

createServer(process.env.PORT);
