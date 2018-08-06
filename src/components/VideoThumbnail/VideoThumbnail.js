import React from 'react';
import PropTypes from 'prop-types';
import './VideoThumbnail.css';

const videoThumbnail = props => {
  const { name, play, url } = props;
  return (
    <div
      className="VideoThumbnail"
      key={url}
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="video-con"
        style={{ position: 'relative' }}
        onClick={play}>
        <i
          className="play-btn material-icons white-text"
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            margin: 0,
            zIndex: 2
          }}>
          play_arrow
					</i>
        <img
          className="card"
          src={`https://img.youtube.com/vi/${url}/0.jpg`}
          style={{ width: '225px', height: '150px' }}
          alt={name}
        />
      </div>
    </div>
  );
}

videoThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  play: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default videoThumbnail;
