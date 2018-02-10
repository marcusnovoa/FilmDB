import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom';
import './App.css';

import Movie from '../components/Movie/Movie';

const movies = [
	{
		id: 1,
		title: 'Star Wars',
		desc: 'A space movie'
	},
	{
		id: 2,
		title: 'Spider Man',
		desc: 'A superhero movie'
	},
	{
		id: 3,
		title: '36th Chamber of Shaolin',
		desc: 'A samurai movie'
	},
	{
		id: 4,
		title: '5 Deadly Venoms',
		desc: 'A horror movie'
	}
];

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<header>
						<nav className="Navbar grey darken-4">
							<div className="nav-wrapper">
								<Link to="/" className="brand-logo white-text">
									FilmDB
								</Link>
								<a data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
								<ul className="right hide-on-med-and-down">
									<li><Link to="/">Dashboard</Link></li>
									<li><Link to="/about">About</Link></li>
									<li><Link to="/contact">Contact</Link></li>
								</ul>
								<ul className="side-nav" id="mobile-demo">
									<li><Link to="/">Dashboard</Link></li>
									<li><Link to="/about">About</Link></li>
									<li><Link to="/contact">Contact</Link></li>
								</ul>
							</div>
						</nav>
					</header>
					{movies.map(movie => <Movie key={movie.id} movie={movie} desc={movie.desc} />)}
				</div>
			</Router>
		);
	}
}

export default App;
