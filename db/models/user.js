const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleTypes = [
  'Employee',
  'Manager',
  'Admin',
  'Director',
]

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  auth0Id: { type: String, required: true },
  department: String,
  role: {
    type: String,
    default: 'Employee',
    required: true,
    enum: roleTypes,
  },
})

module.exports = mongoose.model('User', userSchema);
