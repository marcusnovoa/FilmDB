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
                <div className="container title">
                    <div className="row">
                        <div className="col s12">
                            <h4 className="list-title white-text">Welcome to FilmDB</h4>
                            <p className="list-subtitle white-text">All of your basic movie and TV show information stored in one place.</p>
                        </div>
                    </div>
                    <div className="row filter">
                        <div className="col s12 m4 white-text">
                            <p>Search</p>
                        </div>
                        <div className="col s12 m4 white-text">
                            <p>Genres</p>
                        </div>
                        <div className="col s12 m4 white-text">
                            <p>Keywords</p>
                        </div>
                    </div>
                </div>
                <div className="container movies">
                    {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
                </div>
            </div>
        );
    }
}

export default MoviesList;