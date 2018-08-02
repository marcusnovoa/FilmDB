import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => (
  <header>
    <nav className="Navbar grey darken-4">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo white-text">
          <i className="material-icons">camera_roll</i> FilmDB
        </Link>
        <a data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default navbar;
