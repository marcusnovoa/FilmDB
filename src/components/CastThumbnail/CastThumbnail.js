import React from 'react';
import { Link } from 'react-router-dom';
// import Overdrive from 'react-overdrive';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w92/';

const castThumbnail = props => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {props.path ? (
      <Link to={`/person/${props.id}`}>
        <div style={{ textAlign: 'center' }}>
          <img className="card" style={{ margin: '0 auto' }} src={`${PROFILE_PATH}${props.path}`} alt={props.name} />
          <p style={{ textAlign: 'center', color: '#fff', marginBottom: 0 }}>{props.name}</p>
        </div>
      </Link>
    ) : (
      <Link to={`/person/${props.id}`}>
        <div className="card grey darken-3 white-text" style={{ width: '92px', height: '138px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ textAlign: 'center' }}>{props.name}</p>
        </div>
      </Link>
    )}
  </div>
);

export default castThumbnail;
