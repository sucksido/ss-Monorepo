import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', { date, reason });
      console.log('Booking created:', response.data);
      // Handle success or show a success message
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error or show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <label>Reason:</label>
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;