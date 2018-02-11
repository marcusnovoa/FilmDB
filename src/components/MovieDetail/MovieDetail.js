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

    async componentDidMount() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US`);
            const movie = await res.json();

            this.setState({
                movie,
            });
        } catch(err) {
            console.log(err);
        }
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
                                <div class="card info">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="grey-text">Release Date: {movie.release_date}</p>
                                    <p>{movie.overview}</p>
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