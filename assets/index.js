// app.js
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', handleBooking);
  });
  
  function handleBooking(event) {
    event.preventDefault();
    
    const facility = document.getElementById('facility').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    
    checkAvailability(facility, date, startTime, endTime)
      .then((response) => {
        if (response.available) {
          bookFacility(facility, date, startTime, endTime)
            .then(() => {
              alert('Facility booked successfully.');
            })
            .catch(() => {
              alert('Failed to book the facility.');
            });
        } else {
          alert('Booking failed. Facility already booked for the selected time slot.');
        }
      })
      .catch(() => {
        alert('Failed to check availability.');
      });
  }
  
  function checkAvailability(facility, date, startTime, endTime) {
    const query = `facility=${facility}&date=${date}&startTime=${startTime}&endTime=${endTime}`;
    return fetch(`/api/bookings/availability?${query}`)
      .then((response) => response.json());
  }
  
  function bookFacility(facility, date, startTime, endTime) {
    const bookingData = { facility, date, startTime, endTime };
    return fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
  }
  