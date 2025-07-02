import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StateProvider } from '../StateContext';
import App from '../App';

describe('Demo Mode - Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Demo Mode State Management via UI', () => {
    it('enters demo mode via UI button', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Should start in normal mode
      expect(screen.queryByText(/DEMO MODE/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Try Demo/i)).toBeInTheDocument();

      // Click Try Demo button
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Should now show demo mode indicator
      expect(screen.getByText('🎯 DEMO MODE')).toBeInTheDocument();
      expect(screen.getByText(/Exit Demo/i)).toBeInTheDocument();
      expect(screen.queryByText(/Try Demo/i)).not.toBeInTheDocument();
    });

    it('exits demo mode via UI button', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Enter demo mode first
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Should be in demo mode
      expect(screen.getByText('🎯 DEMO MODE')).toBeInTheDocument();

      // Click Exit Demo button
      const exitDemoButton = screen.getByText(/Exit Demo/i);
      fireEvent.click(exitDemoButton);

      // Should exit demo mode
      expect(screen.queryByText('🎯 DEMO MODE')).not.toBeInTheDocument();
      expect(screen.getByText(/Try Demo/i)).toBeInTheDocument();
    });

    it('shows demo data when entering demo mode', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Should start with empty data (0ml)
      expect(screen.getByText('0 ml')).toBeInTheDocument();

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Should show demo data (750ml for day 0)
      expect(screen.getByText('750 ml')).toBeInTheDocument();
    });
  });

  describe('Demo Mode Write Prevention', () => {
    it('prevents localStorage writes in demo mode', () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
      
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Clear any initial localStorage calls
      setItemSpy.mockClear();

      // Add water intake in demo mode
      const button200ml = screen.getByText('200 ml');
      fireEvent.click(button200ml);

      // localStorage.setItem should not be called for demo data
      expect(setItemSpy).not.toHaveBeenCalledWith('hydrotracker-state', expect.any(String));
      
      setItemSpy.mockRestore();
    });

    it('allows localStorage writes when not in demo mode', () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
      
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Add water intake in normal mode
      const button200ml = screen.getByText('200 ml');
      fireEvent.click(button200ml);

      // localStorage.setItem should be called for normal state
      expect(setItemSpy).toHaveBeenCalledWith('hydrotracker-state', expect.any(String));
      
      setItemSpy.mockRestore();
    });

    it('shows demo mode indicators in status messages', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Add water intake in demo mode
      const button200ml = screen.getByText('200 ml');
      fireEvent.click(button200ml);

      // Status message should indicate demo mode
      expect(screen.getByText(/Added 200 ml \(demo mode\)/)).toBeInTheDocument();
    });
  });

  describe('Demo Mode Data and Navigation', () => {
    it('provides realistic demo data across multiple days', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Should show day 0 data (750ml)
      expect(screen.getByText(/750/)).toBeInTheDocument();

      // Navigate to previous day to check demo data
      const prevButton = screen.getByLabelText(/Previous day/i);
      fireEvent.click(prevButton);
      
      // Should show different data for previous day (1400ml)
      expect(screen.getByText('1400 ml')).toBeInTheDocument();
    });

    it('maintains demo state across actions', () => {
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Verify we're in demo mode
      expect(screen.getByText('🎯 DEMO MODE')).toBeInTheDocument();

      // Perform various actions
      const button200ml = screen.getByText('200 ml');
      fireEvent.click(button200ml);

      const thresholdInput = screen.getByLabelText(/Set daily threshold/i);
      fireEvent.change(thresholdInput, { target: { value: '2500' } });
      fireEvent.click(screen.getByLabelText(/Set threshold/i));

      // Should still be in demo mode after actions
      expect(screen.getByText('🎯 DEMO MODE')).toBeInTheDocument();
    });

    it('restores user data when exiting demo mode', () => {
      // First, add some real user data
      render(
        <StateProvider>
          <App />
        </StateProvider>
      );

      // Add some user data in normal mode
      const button300ml = screen.getByText('300 ml');
      fireEvent.click(button300ml);
      
      // Verify user data is shown (300ml)
      expect(screen.getByText((content, element) => {
        return element?.classList.contains('threshold-status') && content.includes('300');
      })).toBeInTheDocument();

      // Enter demo mode
      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      // Should show demo data (750ml)
      expect(screen.getByText('750 ml')).toBeInTheDocument();

      // Exit demo mode
      const exitDemoButton = screen.getByText(/Exit Demo/i);
      fireEvent.click(exitDemoButton);

      // Should restore user data (300ml)
      expect(screen.getByText((content, element) => {
        return element?.classList.contains('threshold-status') && content.includes('300');
      })).toBeInTheDocument();
    });
  });
});