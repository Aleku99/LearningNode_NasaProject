const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    default: 100,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  customers: [String],
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//connects launchesSchema with the 'launches' collection
module.exports = mongoose.model("Launch", launchesSchema);
