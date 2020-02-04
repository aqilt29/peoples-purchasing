const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listOfEntities = require('./utils/listOfEntities');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

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

userSchema.plugin(mongoose_fuzzy_searching, {
  fields: [{
      name: 'firstName',
      weight: 5
  }, {
      name: 'lastName',
      prefixOnly: true,
  }, {
      name: 'email',
      escapeSpecialCharacters: false,
  }]
});

module.exports = mongoose.model('User', userSchema);
