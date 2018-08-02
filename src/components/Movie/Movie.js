import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.css';

import MovieRating from '../MovieRating/MovieRating';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = props => {
	return (
		<div className="Movie">
			<div id={`${props.movie.id}`} className="ThumbnailCon">
				{props.movie.poster_path ?
					<Link
						style={{
							display: 'flex',
							maxHeight: '231px'
						}}
						to={
							props.movie.media_type
								? `/${props.movie.media_type}/${props.movie.id}`
								: `movie/${props.movie.id}`
					}>
						<img
							className="card thumbnail"
							style={{
								width: '154px',
								maxHeight: '231px'
							}}
							src={`${POSTER_PATH}${props.movie.poster_path}`}
							alt={props.movie.title ? `${props.movie.title}` : `${props.movie.name}`}
						/>
					</Link> :
				props.movie.profile_path ?
					<Link
						style={{
							display: 'flex',
							maxHeight: '231px'
						}}
						to={
							props.movie.media_type
								? `/${props.movie.media_type}/${props.movie.id}`
								: `movie/${props.movie.id}`
					}>
						<img
							className="card thumbnail"
							style={{
								width: '154px',
								maxHeight: '231px'
							}}
							src={`${POSTER_PATH}${props.movie.profile_path}`}
							alt={props.movie.name}
						/>
					</Link> :
					<Link
						style={{
							display: 'flex',
							maxHeight: '231px'
						}}
						to={
							props.movie.media_type
								? `/${props.movie.media_type}/${props.movie.id}`
								: `movie/${props.movie.id}`
					}>
						<div className="card thumbnail grey darken-3 white-text"
							style={{
								width: '154px',
								height: '231px',
								display: 'flex',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center' }}>
							<p style={{ margin: '0 .5rem' }}>{props.movie.title ? props.movie.title : props.movie.name}</p>
						</div>
					</Link>
				}
			</div>
			<div id={`${props.movie.id}-rating`} style={{ width: '100%', position: 'absolute', bottom: props.movie.profile_path ? '-22px' : '-25px' }}>
				<MovieRating movie={props.movie} />
			</div>
		</div>
	);
};

export default Movie;
