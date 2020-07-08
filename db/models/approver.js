const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const approverSchema = new Schema({
  email: String,
  isSent: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  dateApproved: Date,
  dateSent: Date,
})

module.exports = approverSchema;
