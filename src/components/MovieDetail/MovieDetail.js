import React, { Component, Fragment } from 'react';
import Overdrive from 'react-overdrive';
import styled from 'styled-components';
import './MovieDetail.css';

import CastThumbnail from '../CastThumbnail/CastThumbnail';
import Slider from '../../../node_modules/react-slick/lib/slider';
import '../../../node_modules/slick-carousel/slick/slick.css'; 
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
    state = {
        movie: {},
        cast: []
    }

    async componentDidMount() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&append_to_response=credits,videos`);
            const movie = await res.json();
            const members = movie.credits.cast
                .map(member => member.profile_path)
                .filter(path => typeof path === 'string');

            this.setState({
                movie,
                cast: members
            });

            this.castImages = () => {
                this.state.cast.map(image => {
                    return <CastThumbnail path={image} />
                });
            }

            // console.log(this.state.cast);
            // console.log(this.state.movie.videos.results);
        } catch(err) {
            console.log(err);
        }

        // Retrieve Movie Genres
        const { movie } = this.state;
        if(movie.genres) {
            const genres = Array.from(movie.genres);
            const genreNames = genres.map(genre => {
                return genre.name;
            });
            const genreString = genreNames.join(', ');
            document.getElementById('genres').innerText = `Genres: ${genreString}`;
        }
    }

    render() {
        const { movie } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };

        return (
            <Fragment>
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
                <div className="col s12 m10">
                    <Slider {...settings}>
                        {this.castImages}
                    </Slider>
                </div>
            </Fragment>
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
