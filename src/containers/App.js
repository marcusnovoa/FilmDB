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
		pageNum: 1,
		keyword: '',
		fetchMovies: async () => {
			const keyword = document.getElementById('search').value;
			const url = keyword === '' ?
					`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.pageNum}`
					: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${this.state.keyword}&page=${this.state.pageNum}`;
			try {
				const res = await fetch(url);
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

					this.setState({
						pageNum: 1,
						keyword
					});
	
					if(keyword !== '') {
						try {
							const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&page=${this.state.pageNum}`);
							const movies = await res.json();

							this.setState({
								pages: movies,
								movies: movies.results
							});
						} catch (err) {
							console.log(err);
						}
					} else {
						this.state.fetchMovies();
					}
				},
				handlePageClick: async e => {
					const pageNum = e.selected + 1;
					const keyword = document.getElementById('search').value;

					if(keyword === '') {
						try {
							const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
							const movies = await res.json();

							this.setState({
								movies: movies.results,
								pageNum
							});
						} catch (err) {
							console.log(err);
						}
					} else {
						const pageNum = e.selected + 1;

						try {
							const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&page=${pageNum}`);
							const movies = await res.json();

							this.setState({
								pages: movies,
								movies: movies.results,
								pageNum
							});
						} catch (err) {
							console.log(err);
						}
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
