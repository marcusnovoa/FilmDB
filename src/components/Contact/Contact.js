import React from 'react';
import './Contact.css';

const Contact = () => (
  <div className="Contact">
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h4 className="contact-title white-text">Contact Me</h4>
          <p className="white-text">
            Check out my website: <a href="http://marcuscodes.com" target="_blank" rel="noopener noreferrer">marcuscodes.com</a>
          </p>
          <p className="white-text">
            Shoot me an email: <a href="mailto:marcus@marcuscodes.com">marcus@marcuscodes.com</a>
          </p>
          <p className="white-text">
            GitHub Profile: <a href="http://www.github.com/marcusnovoa" target="_blank" rel="noopener noreferrer">Marcus Novoa</a>
          </p>
          <p className="white-text">
            LinkedIn Profile: <a href="http://www.linkedin.com/in/marcusnovoa/" target="_blank" rel="noopener noreferrer">Marcus Novoa</a>
          </p>
          <p className="white-text">
            Instagram Profile: <a href="http://www.instagram.com/marcuscodes/" target="_blank" rel="noopener noreferrer">MarcusCodes</a>
          </p>
          <p className="white-text">
            Twitter Profile: <a href="http://www.twitter.com/marcuscodes/" target="_blank" rel="noopener noreferrer">MarcusCodes</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
