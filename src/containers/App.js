import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MyMoviesList from '../components/MyMoviesList/MyMoviesList';
import MyMovieDetail from '../components/MyMovieDetail/MyMovieDetail';
import MyPersonDetail from '../components/MyPersonDetail/MyPersonDetail';
import Navbar from '../components/Navbar/Navbar';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import MyProvider from '../context';

const App = () => (
	<MyProvider>
		<Router basename="FilmDB">
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" render={MyMoviesList} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/person/:id" render={MyPersonDetail} />
					<Route path="/:mediaType/:id" render={MyMovieDetail} />
				</Switch>
				<Footer />
			</div>
		</Router>
	</MyProvider>
);

export default App;
