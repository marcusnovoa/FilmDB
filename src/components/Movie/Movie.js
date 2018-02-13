import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import './Movie.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
    <div className="Movie">
        <Link to={`/${movie.id}`}>
            <Overdrive id={`${movie.id}`}>
                <img className="card thumbnail" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            </Overdrive>
        </Link>
    </div>
);

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Movie;