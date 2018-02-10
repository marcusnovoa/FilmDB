import React, { Component } from 'react';
import './MoviesList.css';

import Movie from '../Movie/Movie';

class MoviesList extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
            const movies = await res.json();

            this.setState({
                movies: movies.results,
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="MoviesList">
                <div className="container">
                    <h1 className="list-title white-text">Welcome to FilmDB</h1>
                    <h5 className="list-subtitle white-text">All of your basic movie information stored in one place.</h5>
                </div>
                <div className="container movies">
                    {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
                </div>
            </div>
        );
    }
}

export default MoviesList;