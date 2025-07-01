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
    const button = screen.getByText('200 ml');
    fireEvent.click(button);
    expect(screen.getByText(/200 ml/)).toBeInTheDocument();
  });

  it('logs intake via custom input', () => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
    const input = screen.getByPlaceholderText(/Custom amount/i);
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/150 ml/)).toBeInTheDocument();
  });
});
