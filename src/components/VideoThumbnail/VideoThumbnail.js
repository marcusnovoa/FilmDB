import React from 'react';
import './VideoThumbnail.css';

const videoThumbnail = props => (
	<div
		className="VideoThumbnail"
		key={props.url}
		style={{
			backgroundColor: 'transparent',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}
	>
		<div
			className="video-con"
			style={{
				display: 'flex',
				position: 'relative',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<i
					className="play-btn material-icons white-text"
					style={{
						position: 'absolute',
						margin: 0,
						zIndex: 2
					}}>
						play_arrow
				</i>
				<img
					className="card"
					src={`https://img.youtube.com/vi/${props.url}/0.jpg`}
					style={{ width: '225px', height: '150px' }}
					alt={props.name}
				/>
		</div>
	</div>
);

export default videoThumbnail;
