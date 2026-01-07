const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  gender: String,
  address: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
