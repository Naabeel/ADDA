// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create a booking
router.post('/', (req, res) => {
  const { facility, date, startTime, endTime } = req.body;
  const booking = new Booking({ facility, date, startTime, endTime });
  
  booking.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to book the facility.' });
    } else {
      res.status(201).json({ message: 'Facility booked successfully.' });
    }
  });
});

// Check booking availability
router.get('/availability', (req, res) => {
  const { facility, date, startTime, endTime } = req.query;

  Booking.find(
    {
      facility,
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    },
    (err, bookings) => {
      if (err) {
        res.status(500).json({ error: 'Failed to check availability.' });
      } else if (bookings.length > 0) {
        res.status(200).json({ available: false });
      } else {
        res.status(200).json({ available: true });
      }
    }
  );
});

module.exports = router;
