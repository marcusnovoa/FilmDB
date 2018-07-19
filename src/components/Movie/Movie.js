import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import './Movie.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => {
    let bgColor;
    if(movie.vote_average >= 7) {
        bgColor = '#27ae60';
    } else if(movie.vote_average >= 5) {
        bgColor = '#f39c12';
    } else if(movie.vote_average >= 3) {
        bgColor = '#d35400';
    } else {
        bgColor = '#c0392b';
    }

    return (
        <div className="Movie">
            <Link to={`/${movie.id}`}>
                <Overdrive id={`${movie.id}`} className="ThumbnailCon">
                    <img className="card thumbnail" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                </Overdrive>
                <div className="RatingCon">
                    <div className="Rating" style={{ backgroundColor: bgColor }}>
                        <i className="material-icons">
                            star_rate
                        </i>
                        <p>{`${movie.vote_average}`}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Movie;
