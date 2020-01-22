require('dotenv').config();
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const connectdb = require('../db');
const router = require('./routes');

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(router);

//  this is here to send the assests of the file with it in the script tags.
app.use(express.static(path.join(__dirname, '../prHtml')))
app.use(express.static(path.join(__dirname, '../documentTemplates')))


//  this was here to have access to the template HTML for the PR form.
app.get('/', async (req, res) => {
    try {
        res.status(200).sendfile(path.join(__dirname, '../documentTemplates/testform.html'));
    } catch (error) {
        res.status(404).end(error)
    }
})


connectdb().then((arg) => {
    console.log('PORT' ,process.env.PORT)
    app.listen(process.env.PORT);
})

