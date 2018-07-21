import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Overdrive from 'react-overdrive';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w92/';

const castThumbnail = props => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {props.path ? (
      <Fragment>
        <img className="card" src={`${PROFILE_PATH}${props.path}`} alt={props.name} />
        <p style={{ textAlign: 'center', color: '#fff', marginBottom: 0 }}>{props.name}</p>
      </Fragment>
     ) : (
      <div className="card grey darken-3 white-text" style={{ width: '92px', height: '138px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ textAlign: 'center' }}>{props.name}</p>
      </div>
     )}
  </div>
);

export default castThumbnail;
