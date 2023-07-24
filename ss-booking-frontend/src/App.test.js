import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn();

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the form', () => {
    render(<App />);
    const dateInput = screen.getByLabelText('Date:');
    const reasonInput = screen.getByLabelText('Reason:');
    const createButton = screen.getByText('Create Booking');

    expect(dateInput).toBeInTheDocument();
    expect(reasonInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  test('should call the fetchBookings function when the component mounts', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<App />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the async useEffect to complete
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/bookings');
  });

  test('should call the handleSubmit function when the form is submitted', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<App />);
    const dateInput = screen.getByLabelText('Date:');
    const reasonInput = screen.getByLabelText('Reason:');
    const createButton = screen.getByText('Create Booking');

    // Set values for the inputs
    fireEvent.change(dateInput, { target: { value: '2023-07-25T10:00' } });
    fireEvent.change(reasonInput, { target: { value: 'Test reason' } });

    // Mock successful POST request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, date: '2023-07-25T10:00', reason: 'Test reason' }),
    });

    // Submit the form
    fireEvent.click(createButton);

    // Wait for async updates and state changes using act
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledTimes(3); // One for initial fetch and one for handleSubmit
  });
});