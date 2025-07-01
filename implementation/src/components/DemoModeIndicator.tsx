import React from 'react';

interface DemoModeIndicatorProps {
  isDemo: boolean;
  onExitDemo: () => void;
  onEnterDemo: () => void;
}

const DemoModeIndicator: React.FC<DemoModeIndicatorProps> = ({
  isDemo,
  onExitDemo,
  onEnterDemo,
}) => {
  if (isDemo) {
    return (
      <div className="demo-mode-indicator" aria-live="polite">
        <span className="demo-badge">🎯 DEMO MODE</span>
        <span className="demo-text">You're in demo mode - data won't be saved</span>
        <button 
          className="demo-exit-button" 
          onClick={onExitDemo}
          aria-label="Exit demo mode"
        >
          Exit Demo
        </button>
      </div>
    );
  }

  return (
    <div className="demo-mode-controls">
      <button 
        className="demo-enter-button" 
        onClick={onEnterDemo}
        aria-label="Enter demo mode"
      >
        Try Demo
      </button>
    </div>
  );
};

export default DemoModeIndicator;