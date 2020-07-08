const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const approverSchema = require('./approver');



const entitySchema = new Schema({
  name: String,
  approverList: {
    approverOne: { type: approverSchema },
    approverTwo: { type: approverSchema },
  },
})

module.exports = mongoose.model('Entity', entitySchema);
