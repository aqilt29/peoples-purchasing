const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listOfEntities = require('./utils/listOfEntities');

const roleTypes = [
  'Employee',
  'Manager',
  'Admin',
  'Director',
]

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  auth0Id: { type: String, required: true },
  entity: {
    type: String,
    default: 'New Patriot Holdings',
    enum: listOfEntities
  },
  role: {
    type: String,
    default: 'Employee',
    required: true,
    enum: roleTypes,
  },
})

module.exports = mongoose.model('User', userSchema);
