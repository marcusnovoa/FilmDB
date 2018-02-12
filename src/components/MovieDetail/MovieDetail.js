import React, { Component } from 'react';
import Overdrive from 'react-overdrive';
import styled from 'styled-components';
import './MovieDetail.css';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
    state = {
        movie: {},
    }

    async componentWillMount() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US`);
            const movie = await res.json();

            this.setState({
                movie,
            });
        } catch(err) {
            console.log(err);
        }

        // Retrieve Movie Genres
        const { movie } = this.state;
        const genres = Array.from(movie.genres);
        const genreNames = genres.map(genre => {
            return genre.name;
        });
        const genreString = genreNames.join(', ');
        document.getElementById('genres').innerText = `Genres: ${genreString}`;
    }

    render() {
        const { movie } = this.state;
        return (
            <MovieWrapper className="MovieDetail" backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
                <div className="MovieInfo">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m2">
                                <Overdrive id={`${movie.id}`}>
                                    <img className="card" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                                </Overdrive>
                            </div>
                            <div className="col s12 m10">
                                <div className="card info grey darken-3">
                                    <h4 className="movie-title white-text">{movie.title}</h4>
                                    <p className="movie-tagline white-text">{movie.tagline}</p>
                                    <p className="grey-text text-darken-2">Release Date: {movie.release_date}</p>
                                    <p className="white-text">{movie.overview}</p>
                                    <p id="genres" className="movie-genres grey-text text-darken-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MovieWrapper>
        );
    }
}

const MovieWrapper = styled.div`
    position: relative;
    padding-top: 50vh;
    background: url(${props => props.backdrop}) no-repeat;
    background-size: cover;
    background-position: center;
`;

export default MovieDetail;