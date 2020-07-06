const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash')



const entitySchema = new Schema({
  name: String,
  approverLists: {

  }
})

module.exports = mongoose.model('Entity', entitySchema);
