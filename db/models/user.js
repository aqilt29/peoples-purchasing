const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listOfEntities = require('./utils/listOfEntities');
// const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const roleTypes = [
  'User',
  'Admin',
  'Accounting',
  'PRCreator',
  'Buyer',
  'Manager',
];

const costCenters = [
  10200,
  10201,
  10202,
  10203,
  10204,
  10205,
  10206,
  10207,
  10208,
  10209,
  10210,
  10211,
  10212,
  10213
];

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
    default: 'PRCreator',
    required: true,
    enum: roleTypes,
  },
  costCenter: {
    type: Number,
    required: true,
    enum: costCenters,
  }
})

// userSchema.plugin(mongoose_fuzzy_searching, {
//   fields: [{
//       name: 'firstName',
//       weight: 5
//   }, {
//       name: 'lastName',
//       prefixOnly: true,
//   }, {
//       name: 'email',
//       escapeSpecialCharacters: false,
//   }]
// });

module.exports = mongoose.model('User', userSchema);
