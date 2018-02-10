import React, { Component } from 'react';
import './App.css';

import Movie from '../components/Movie/Movie';

const movies = [
	{
		id: 1,
		title: 'Star Wars'
	},
	{
		id: 2,
		title: 'Spider Man'
	},
	{
		id: 3,
		title: '36th Chamber of Shaolin'
	},
	{
		id: 4,
		title: '5 Deadly Venoms'
	}
];

class App extends Component {
	render() {
		return (
			<div className="App">
				<header>
					<h1 className="header-title">FilmDB</h1>
				</header>
				{movies.map(movie => <Movie key={movie.id} movie={movie} />)}
			</div>
		);
	}
}

export default App;
