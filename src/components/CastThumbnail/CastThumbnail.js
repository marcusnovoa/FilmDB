import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import Overdrive from 'react-overdrive';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w200/';

const castThumbnail = props => (
  <div>
    <img src={require(`${PROFILE_PATH}${props.path}`)} alt="" />
  </div>
);

export default castThumbnail;
