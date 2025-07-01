import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StateProvider } from '../StateContext';
import App from '../App';

describe('HydroTracker App', () => {
  it('renders main UI components', () => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
    expect(screen.getByText(/HydroTracker/i)).toBeInTheDocument();
    expect(screen.getByText(/Today:/i)).toBeInTheDocument();
    expect(screen.getByText(/Threshold:/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
  });

  it('logs intake via predefined buttons', () => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
    // Find the button by its accessible name
    const button = screen.getByRole('button', { name: /200 milliliters/i });
    fireEvent.click(button);
    // Check for the status message
    expect(screen.getByText(/Added 200 ml/)).toBeInTheDocument();
    // Optionally, check that the total updates (Today: ...)
    expect(screen.getByText(/Today:/i).parentElement).toHaveTextContent(/200 ml/);
  });

  it('logs intake via custom input', () => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
    const input = screen.getByPlaceholderText(/Custom amount/i);
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(screen.getByRole('button', { name: /add custom amount/i }));
    // Check for the status message
    expect(screen.getByText(/Added 150 ml/)).toBeInTheDocument();
    // Optionally, check that the total updates (Today: ...)
    expect(screen.getByText(/Today:/i).parentElement).toHaveTextContent(/150 ml/);
  });
});
