import React from 'react';
import Navbar from '../Navbar/Navbar';

export const WindowSpinner = () => (
  <div style={{
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 100
  }}>
    <Navbar />
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#222',
      color: '#fff'
    }}>
      <p>Loading...</p>
    </div>
  </div>
);

export const Spinner = () => (
  <div style={{
    width: '100%',
    height: '1128px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#222',
    color: '#fff'
  }}>
    <p>Loading...</p>
  </div>
);
