require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectdb = require('../db');
const requestRouter =  require('./routes/request');

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/request', requestRouter)

connectdb().then((arg) => {
    console.log('PORT' ,process.env.PORT)
    app.listen(process.env.PORT);
})

