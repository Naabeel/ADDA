// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// const facilities = [
//   { name: 'Clubhouse', rates: { '10': 100, '16': 500 } },
//   { name: 'Tennis Court', rates: { '0': 50 } }
// ];

// const bookings = [];

// function isBookingAvailable(facilityName, startDate, endDate) {
//   for (const booking of bookings) {
//     if (
//       booking.facilityName === facilityName &&
//       !(booking.endDate < startDate || booking.startDate > endDate)
//     ) {
//       return false;
//     }
//   }
//   return true;
// }

// function calculateAmount(facility, startDate, endDate) {
//   let totalAmount = 0;
//   const currentDate = new Date(startDate);
//   while (currentDate <= endDate) {
//     const hour = currentDate.getHours();
//     const amount = facility.rates[hour.toString()] || 0;
//     totalAmount += amount;
//     currentDate.setHours(hour + 1);
//   }
//   return totalAmount;
// }

// app.post('/bookings', (req, res) => {
//   const { facilityName, startDate, endDate } = req.body;

//   const facility = facilities.find((f) => f.name === facilityName);
//   if (!facility) {
//     res.status(400).json({ message: 'Facility not found.' });
//     return;
//   }

//   if (!isBookingAvailable(facilityName, new Date(startDate), new Date(endDate))) {
//     res.status(400).json({ message: 'Booking Failed, Already Booked' });
//     return;
//   }

//   const amount = calculateAmount(facility, new Date(startDate), new Date(endDate));
//   bookings.push({ facilityName, startDate: new Date(startDate), endDate: new Date(endDate), amount });
//   res.status(200).json({ message: 'Booked', amount });
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });




// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/facility_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
