
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  facility: String,
  date: Date,
  startTime: String,
  endTime: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
