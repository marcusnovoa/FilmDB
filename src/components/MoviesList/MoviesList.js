import React, { Component } from 'react';
import './MoviesList.css';

import Movie from '../Movie/Movie';

class MoviesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
        };

        this.keywordSearch = this.keywordSearch.bind(this);
    }

    async onLoadResults() {
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

    componentDidMount() {
        this.onLoadResults();
    }
    
    async keywordSearch() {
        const keyword = document.getElementById('search').value;

        if(keyword !== '') {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&page=1`);
                const movies = await res.json();

                this.setState({
                    movies: movies.results,
                });

                // console.log(movies)
            } catch (err) {
                console.log(err);
            }
        } else {
            this.onLoadResults();
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
                        <div className="col s12 white-text">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input id="search" type="text" className="search-input" onChange={this.keywordSearch}></input>
                                <label htmlFor="search" data-error="wrong" data-success="right">Search for Movies and TV Shows...</label>
                            </div>
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