import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './MovieRating.css';

const movieRating = props => {
  const { movie } = props;
  let bgColor;
  if (movie.vote_average >= 7) {
    bgColor = '#27ae60';
  } else if (movie.vote_average >= 5) {
    bgColor = '#f39c12';
  } else if (movie.vote_average >= 3) {
    bgColor = '#d35400';
  } else {
    bgColor = '#c0392b';
  }
  let voteAverage;
  if (movie.vote_average) {
    voteAverage = (Math.round(movie.vote_average * 10) / 10).toFixed(1);
    if (voteAverage % 1 === 0) voteAverage = parseInt(voteAverage, 10);
  }
  return (
    <Fragment>
      {movie.vote_average ?
        <div className="RatingCon">
          <div className="Rating" style={{ backgroundColor: bgColor }}>
            <i className="material-icons">star_rate</i>
            <p>{voteAverage}</p>
          </div>
        </div> :
        movie.media_type === 'person' ?
          <div className="RatingCon">
            <div className="Rating" style={{ backgroundColor: '#3498db' }}>
              <i className="material-icons">person</i>
            </div>
          </div> :
          <div className="RatingCon">
            <div className="Rating" style={{ backgroundColor: bgColor }}>
              <i className="material-icons">star_rate</i>
              <p>0</p>
            </div>
          </div>
      }
    </Fragment>
  );
}

movieRating.propTypes = {
  movie: PropTypes.object.isRequired
}

export default movieRating;
