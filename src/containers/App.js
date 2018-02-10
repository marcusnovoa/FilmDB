import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom';
import './App.css';

import Movie from '../components/Movie/Movie';

class App extends Component {
	state = {
		movies: []
	}
	
	async componentDidMount() {
		try {
			const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
			const movies = await res.json();

			this.setState({
				movies: movies.results
			});
		} catch(err) {
			console.log(err);
		}
	}

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
					{this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
				</div>
			</Router>
		);
	}
}

export default App;
