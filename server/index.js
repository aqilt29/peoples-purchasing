require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
// const parser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');

const connectdb = require('../db');
const router = require('./routes');

const app = express();

connectdb().then((arg) => {
    app.listen(process.env.PORT);
})

app.use(router);

