import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({ movie }) => {
    return (
        <div className="Movie">
            <h3>{movie.title}</h3>
        </div>
    );
}

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Movie;