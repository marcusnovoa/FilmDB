import React from 'react';
import { Link } from 'react-router-dom';
// import Overdrive from 'react-overdrive';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w92/';

const castThumbnail = props => (
  <div style={{ padding: '0 .5rem 2rem .5rem' }}>
    {props.path ? (
      <Link to={`/person/${props.id}`}>
        <div
          className="card grey darken-3 white-text"
          style={{
            margin: '0 1rem',
            minHeight: '138px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden'
          }}>
          <img src={`${PROFILE_PATH}${props.path}`} alt={props.name} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto'
          }}>
            <p style={{
              textAlign: 'center',
              fontWeight: 500,
              margin: '0 .5rem'
            }}>{props.name}</p>
            {props.character ?
              <p style={{
                textAlign: 'center',
                fontWeight: 300,
                fontStyle: 'italic',
                margin: '0 .5rem'
              }}>as {props.character}</p>
            : null }
          </div>
        </div>
      </Link>
    ) : (
      <Link to={`/person/${props.id}`}>
        <div
          className="card grey darken-3 white-text"
          style={{
            margin: '0 1rem',
            minHeight: '138px',
            position: 'relative'
          }}>
          <div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <p style={{
              textAlign: 'center',
              fontWeight: 500,
              margin: '0 .5rem'
            }}>{props.name}</p>
            {props.character ?
              <p style={{
                textAlign: 'center',
                fontWeight: 300,
                fontStyle: 'italic',
                margin: '0 .5rem'
              }}>as {props.character}</p>
            : null }
          </div>
        </div>
      </Link>
    )}
  </div>
);

export default castThumbnail;
