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
			style={{ position: 'relative' }}
			onClick={props.play}>
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
					src={`https://img.youtube.com/vi/${props.url}/0.jpg`}
					style={{ width: '225px', height: '150px' }}
					alt={props.name}
				/>
		</div>
	</div>
);

export default videoThumbnail;
