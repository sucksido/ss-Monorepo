import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { getToken } from './Auth';


const App = () => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [bookings, setBookings] = useState([]);
  const clientId = '1';
  const clientSecret = 'x0ocgPXB4OKlxVWsuCtzd5nBd3XrBAiknYJNAe1v';
  //const tokenEndpoint = 'http://127.0.0.1:8000/oauth/token';
 // let accessToken = null;
  const setAccessToken = useState(null);
  const accessToken = getToken();




  useEffect(() => {
    fetchBookings();
    login();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/oauth/token', {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
      });

      const token = response.data.access_token;
      setAccessToken(token); // Save the access token to the state
    } catch (error) {
      // Handle login errors
    }
  };

  const fetchBookings = async () => {
    console.log(accessToken,"=====");
    if (!accessToken) {
      console.error('Access token is not available. Failed to fetch bookings.');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8000/api/bookings', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };



  // const fetchBookings = async () => {
  //   try {

  
  //     if (!accessToken) {
  //       console.error('Access token is not available. Failed to fetch bookings.');
  //       return;
  //     }
  
  //     const apiEndpoint = 'http://localhost:8000/api/bookings';
  //     const response = await fetch(apiEndpoint, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch bookings');
  //     }
  
  //     const data = await response.json();
  //     console.log(data);
  //     setBookings(data);
  //   } catch (error) {
  //     console.error('Error fetching bookings:', error);
  //   }
  // };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/bookings', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, reason }),
    });
    if (response.ok) {
      fetchBookings();
      setDate('');
      setReason('');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Booking</button>
      </form>
      <h2 className="bookings-header">Bookings:</h2>
      <ul className="bookings-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            Date: {new Date(booking.date).toLocaleString()}, Reason:{' '}
            {booking.reason}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;