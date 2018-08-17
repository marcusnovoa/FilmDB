import React from 'react';
import './About.css';

const About = () => (
  <div className="About">
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h4 className="about-title white-text">About FilmDB</h4>
        </div>
      </div>
      <div className="row info">
        <div className="col s12">
          <p className="white-text">
            FilmDB is a web-app built using ReactJS for the front-end that fetches movie data from
            The Movie Database (TMDb) API using the Async/Await features from JavaScript ES7.
          </p>
          <p className="white-text">
            FilmDB was designed by LevelUpTuts as "LUTDB" and provided as a short-list of
            online tutorials. This version was built from beginning to end by Marcus Novoa and has
            been modified from the one created by LevelUpTuts.
          </p>
          <p className="white-text">My changes include:</p>
          <ul>
            <li><p className="white-text">- Adding content and styling changes to the UI.</p></li>
            <li><p className="white-text">- Enabling global state using React's Context API.</p></li>
            <li><p className="white-text">- Implementing a search bar for various searches utilizing the state.</p></li>
            <li><p className="white-text">- The addition of TV show and cast member search capabilities.</p></li>
            <li><p className="white-text">- Cast lists and videos available in movie details.</p></li>
            <li><p className="white-text">- Personal pages for cast members with lists of casting roles.</p></li>
            <li><p className="white-text">- Pagination</p></li>
            <li><p className="white-text">- Materialize CSS</p></li>
            <li><p className="white-text">- SCSS</p></li>
          </ul>
          <p className="white-text">
            My Git repository can be found here: <a href="https://github.com/marcusnovoa/FilmDB" target="_blank" rel="noopener noreferrer">FilmDB GitHub</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
