import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { StateProvider } from './StateContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StateProvider>
      <App />
    </StateProvider>
  );
}
