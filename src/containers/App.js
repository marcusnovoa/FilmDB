import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import MyMoviesList from '../components/MyMoviesList/MyMoviesList';
import MyMovieDetail from '../components/MyMovieDetail/MyMovieDetail';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import MyProvider from '../context';

const App = () => (
	<MyProvider>
		<Router>
			<div className="App">
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
				<Switch>
					<Route exact path="/" render={MyMoviesList} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/:mediaType/:id" render={MyMovieDetail} />
				</Switch>
				<Footer />
			</div>
		</Router>
	</MyProvider>
);

export default App;
