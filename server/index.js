require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('../db');
const sample = require('../db/sampleForm');

const app = express();

const createServer = async PORT => {
    let models;

    // first connect to the DB
    try {
        console.log(`Establish DB connection`);
        models = await connectDb();
        
    } catch (error) {
        console.log(`Error in DB connection ${error}`)
    }
    
    //  2nd try to start server
    try {
        await app.listen(PORT)
        console.log(`App is now listening on PORT ${PORT}`)
        
    } catch (error) {
        console.log(`Error starting the server ${error}`)
    }

    return models;
}

app.get('/insertsample', (req, res) => {
    console.log('got sample');
    try {
        
    } catch (error) {
        
    }
})

createServer(process.env.PORT);


