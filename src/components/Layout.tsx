import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app-layout">
    <header>
      <h1>Hydro Tracker</h1>
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
