import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Spinner.css';

export const WindowSpinner = () => (
  <div style={{
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 100
  }}>
    <Navbar />
    <div className="window-spinner-con">
      <div className="la-ball-clip-rotate-multiple la-2x">
        <div />
        <div />
      </div>
    </div>
  </div>
);

export const Spinner = () => (
  <div className="movies-spinner-con">
    <div className="la-ball-clip-rotate-multiple la-2x">
      <div />
      <div />
    </div>
  </div>
);
