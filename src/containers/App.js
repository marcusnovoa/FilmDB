import React, { Component } from 'react';
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
			<div className="App">
				<header>
					<h1 className="header-title">FilmDB</h1>
				</header>
				{movies.map(movie => <Movie key={movie.id} movie={movie} desc={movie.desc} />)}
			</div>
		);
	}
}

export default App;
