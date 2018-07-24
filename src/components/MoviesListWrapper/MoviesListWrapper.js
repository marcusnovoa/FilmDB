import React from 'react';
import './MoviesListWrapper.css';

const moviesListWrapper = props => {
  return (
    <div className="container movies">
      {props.children}
    </div>
  )
}

export default moviesListWrapper;
