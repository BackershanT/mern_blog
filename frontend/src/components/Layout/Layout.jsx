// src/components/Layout/Layout.jsx
import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <NavBar />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
