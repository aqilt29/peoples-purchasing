require('dotenv').config();
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const connectDb = require('../db');
const requestRouter =  require('./routes/requests');
const userRouter = require('./routes/users');
const vendorRouter = require('./routes/vendors');
const entityRouter = require('./routes/entities');
const itemRouter = require('./routes/items');
const purchaseOrderRouter = require('./routes/purchaseOrder');

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/requests', requestRouter);
app.use('/api/items', itemRouter);
app.use('/api/entities', entityRouter);
app.use('/api/vendors', vendorRouter);
app.use('/api/users', userRouter);
app.use('/api/purchaseorders', purchaseOrderRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));


connectDb().then((arg) => {
    console.log('PORT' ,process.env.PORT)
    app.listen(process.env.PORT);
})

