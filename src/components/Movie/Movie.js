import React from 'react';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import './Movie.css';

import MovieRating from '../MovieRating/MovieRating';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = props => {
	return (
		<div className="Movie">
			<Link
				to={
					props.movie.media_type
						? `/${props.movie.media_type}/${props.movie.id}`
						: `movie/${props.movie.id}`
				}
			>
				<Overdrive id={`${props.movie.id}`} className="ThumbnailCon">
					{props.movie.poster_path ?
						<img
							className="card thumbnail"
							style={{
								width: '154px',
								maxHeight: '231px'
							}}
							src={`${POSTER_PATH}${props.movie.poster_path}`}
							alt={props.movie.title ? `${props.movie.title}` : `${props.movie.name}`}
						/> :
					props.movie.profile_path ?
						<img
							className="card thumbnail"
							style={{
								width: '154px',
								maxHeight: '231px'
							}}
							src={`${POSTER_PATH}${props.movie.profile_path}`}
							alt={props.movie.name}
						/> :
						<div className="card thumbnail grey darken-3 white-text"
							style={{
								width: '154px',
								height: '231px',
								display: 'flex',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center' }}>
							<p>{props.movie.title ? props.movie.title : props.movie.name}</p>
						</div>
					}
				</Overdrive>
				<Overdrive id={`${props.movie.id}-rating`} style={{ width: '100%', position: 'absolute', bottom: '-25px' }}>
					<MovieRating movie={props.movie} />
				</Overdrive>
			</Link>
		</div>
	);
};

export default Movie;
