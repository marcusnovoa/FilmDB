import React, { Fragment } from 'react';
import './MovieRating.css';

const movieRating = props => {
  let bgColor;
	if (props.movie.vote_average >= 7) {
		bgColor = '#27ae60';
	} else if (props.movie.vote_average >= 5) {
		bgColor = '#f39c12';
	} else if (props.movie.vote_average >= 3) {
		bgColor = '#d35400';
	} else {
		bgColor = '#c0392b';
	}
  return(
    <Fragment>
      {props.movie.vote_average ?
        <div className="RatingCon">
          <div className="Rating" style={{ backgroundColor: bgColor }}>
            <i className="material-icons">star_rate</i>
            <p>{`${props.movie.vote_average}`}</p>
          </div>
        </div> : 
      props.movie.media_type === 'person' ?
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

export default movieRating;
