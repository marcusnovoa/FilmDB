import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import './App.css';
import MyMoviesList from '../components/MyMoviesList/MyMoviesList';
import MyMovieDetail from '../components/MyMovieDetail/MyMovieDetail';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

// Context
export const MyContext = React.createContext();
// Provider Component
class MyProvider extends Component {
	state = {
		pages: [],
		movies: [],
		fetchMovies: async () => {
			try {
					const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.pageNum}`);
					const movies = await res.json();

					this.setState({
							pages: movies,
							movies: movies.results
					});
			} catch (err) {
					console.log(err);
			}
		},
	}
	render() {
		return(
			<MyContext.Provider value={{
				state: this.state,
				keywordSearch: async () => {
					this.setState({ pageNum: 1 });
					const keyword = document.getElementById('search').value;
	
					if(keyword !== '') {
						try {
								const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&page=${this.state.pageNum}`);
								const movies = await res.json();
								const mediaTypes = this.state.movies.map(movie => {
									return {
										id: movie.id,
										media_type: movie.media_type
									}
								});

								this.setState({
									pages: movies,
									movies: movies.results,
									mediaTypes
								});
						} catch (err) {
							console.log(err);
						}
					} else {
						this.state.fetchMovies();
					}
				}
			}}>
				{this.props.children}
			</MyContext.Provider>
		);
	}
}

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
				<Switch>
					<Route exact path="/" render={ MyMoviesList } />
					<Route path="/about" component={ About } />
					<Route path="/contact" component={ Contact } />
					<Route path="/:mediaType/:id" render={ MyMovieDetail } />
				</Switch>
				<Footer />
			</div>
		</Router>
	</MyProvider>
);

export default App;
