import React from 'react';

const moviesListWrapper = props => {
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {props.children}
    </div>
  )
}

export default moviesListWrapper;
