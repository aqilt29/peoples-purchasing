const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash')


const entitySchema = new Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  }
})

module.exports = mongoose.model('Entity', entitySchema);
