

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { StateProvider, setDemoMode } from './StateContext';
import { DEMO_STATE } from './demoData';

const DemoModeContext = createContext(false);

function getDemoModeFromUrl() {
  const url = new URL(window.location.href);
  return url.searchParams.get('demo') === '1' || (window as any).demoMode;
}

const DemoModeProvider = ({ children }: { children: ReactNode }) => {
  const [demo, setDemo] = useState(getDemoModeFromUrl());
  useEffect(() => {
    if (demo) setDemoMode(DEMO_STATE);
    // Listen for URL changes (popstate)
    const onPopState = () => {
      const isDemo = getDemoModeFromUrl();
      if (isDemo) setDemoMode(DEMO_STATE);
      setDemo(isDemo);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [demo]);
  return <DemoModeContext.Provider value={demo}>{children}</DemoModeContext.Provider>;
};

function useDemoMode() {
  return useContext(DemoModeContext);
}

function AppWithRemount() {
  const demo = useDemoMode();
  // Use demo as key to force remount of StateProvider
  return (
    <StateProvider key={demo ? 'demo' : 'normal'}>
      <App />
    </StateProvider>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <DemoModeProvider>
      <AppWithRemount />
    </DemoModeProvider>
  );
}
