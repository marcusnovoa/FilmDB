import React from 'react';
import './Footer.css';

const Footer = props => {
    return (
        <div className="Footer">
            <footer className="page-footer grey darken-4">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">By Marcus Novoa</h5>
                            <p className="grey-text text-lighten-4">Feel free to visit me on social media.</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">My Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="http://www.marcuscodes.com" target="_blank" rel="noopener noreferrer">Web Portfolio</a></li>
                                <li><a className="grey-text text-lighten-3" href="http://www.linkedin.com/in/marcusnovoa/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a className="grey-text text-lighten-3" href="http://www.instagram.com/marcuscodes/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                                <li><a className="grey-text text-lighten-3" href="http://www.twitter.com/marcuscodes/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container white-text">
                        © 2018 Copyright Marcus Novoa
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;