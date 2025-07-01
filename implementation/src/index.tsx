import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { StateProvider, setDemoMode } from './StateContext';
import { DEMO_STATE } from './demoData';

// DemoModeProvider: checks URL param or window.demoMode to enable demo mode
const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [demo, setDemo] = React.useState(false);
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('demo') === '1' || (window as any).demoMode) {
      setDemoMode(DEMO_STATE);
      setDemo(true);
    }
  }, []);
  return <>{children}</>;
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <DemoModeProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </DemoModeProvider>
  );
}
