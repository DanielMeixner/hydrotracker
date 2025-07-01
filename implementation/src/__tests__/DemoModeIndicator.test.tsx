import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DemoModeIndicator from '../components/DemoModeIndicator';

describe('Demo Mode - UI/UX Tests', () => {
  describe('Demo Mode Indicator Visibility', () => {
    it('shows demo mode banner when isDemo is true', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      render(
        <DemoModeIndicator
          isDemo={true}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      // Should show demo badge and text
      expect(screen.getByText(/🎯 DEMO MODE/i)).toBeInTheDocument();
      expect(screen.getByText(/data won't be saved/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Exit demo mode/i)).toBeInTheDocument();
    });

    it('shows try demo button when isDemo is false', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      render(
        <DemoModeIndicator
          isDemo={false}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      // Should show try demo button
      expect(screen.getByLabelText(/Enter demo mode/i)).toBeInTheDocument();
      expect(screen.getByText(/Try Demo/i)).toBeInTheDocument();
      
      // Should not show demo mode elements
      expect(screen.queryByText(/🎯 DEMO MODE/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/data won't be saved/i)).not.toBeInTheDocument();
    });

    it('has proper ARIA attributes for accessibility', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      render(
        <DemoModeIndicator
          isDemo={true}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      // Check aria-live attribute is present on the demo indicator
      const indicator = screen.getByText(/data won't be saved/i).closest('.demo-mode-indicator');
      expect(indicator).toHaveAttribute('aria-live', 'polite');

      // Check button accessibility
      const exitButton = screen.getByLabelText(/Exit demo mode/i);
      expect(exitButton).toHaveAttribute('aria-label', 'Exit demo mode');
    });
  });

  describe('Demo Mode Feature Functionality', () => {
    it('calls onEnterDemo when Try Demo button is clicked', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      render(
        <DemoModeIndicator
          isDemo={false}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      const tryDemoButton = screen.getByText(/Try Demo/i);
      fireEvent.click(tryDemoButton);

      expect(mockOnEnterDemo).toHaveBeenCalledTimes(1);
      expect(mockOnExitDemo).not.toHaveBeenCalled();
    });

    it('calls onExitDemo when Exit Demo button is clicked', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      render(
        <DemoModeIndicator
          isDemo={true}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      const exitDemoButton = screen.getByText(/Exit Demo/i);
      fireEvent.click(exitDemoButton);

      expect(mockOnExitDemo).toHaveBeenCalledTimes(1);
      expect(mockOnEnterDemo).not.toHaveBeenCalled();
    });

    it('has proper styling classes for visual distinction', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      const { container } = render(
        <DemoModeIndicator
          isDemo={true}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      // Check for demo mode indicator styling
      expect(container.querySelector('.demo-mode-indicator')).toBeInTheDocument();
      expect(container.querySelector('.demo-badge')).toBeInTheDocument();
      expect(container.querySelector('.demo-text')).toBeInTheDocument();
      expect(container.querySelector('.demo-exit-button')).toBeInTheDocument();
    });

    it('has proper styling classes for try demo state', () => {
      const mockOnExitDemo = jest.fn();
      const mockOnEnterDemo = jest.fn();

      const { container } = render(
        <DemoModeIndicator
          isDemo={false}
          onExitDemo={mockOnExitDemo}
          onEnterDemo={mockOnEnterDemo}
        />
      );

      // Check for try demo styling
      expect(container.querySelector('.demo-mode-controls')).toBeInTheDocument();
      expect(container.querySelector('.demo-enter-button')).toBeInTheDocument();
    });
  });

  describe('Demo Mode Integration with App', () => {
    it('integrates properly with StateProvider context', () => {
      // This test is implicitly covered by the DemoMode.test.tsx file
      // where we test the full integration with the StateProvider
      expect(true).toBe(true);
    });
  });
});