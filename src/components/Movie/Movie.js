import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Movie.css';

import MovieRating from '../MovieRating/MovieRating';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = props => {
	const { movie } = props;
	return (
		<div className="Movie">
			<div id={`${movie.id}`} className="ThumbnailCon">
				{movie.poster_path ?
					<Link
						style={{
							display: 'flex',
							maxHeight: '231px'
						}}
						to={
							movie.media_type
								? `/${movie.media_type}/${movie.id}`
								: `movie/${movie.id}`
						}>
						<img
							className="card thumbnail"
							style={{
								width: '154px',
								maxHeight: '231px'
							}}
							src={`${POSTER_PATH}${movie.poster_path}`}
							alt={movie.title ? `${movie.title}` : `${movie.name}`}
						/>
					</Link> :
					movie.profile_path ?
						<Link
							style={{
								display: 'flex',
								maxHeight: '231px'
							}}
							to={
								movie.media_type
									? `/${movie.media_type}/${movie.id}`
									: `movie/${movie.id}`
							}>
							<img
								className="card thumbnail"
								style={{
									width: '154px',
									maxHeight: '231px'
								}}
								src={`${POSTER_PATH}${movie.profile_path}`}
								alt={movie.name}
							/>
						</Link> :
						<Link
							style={{
								display: 'flex',
								maxHeight: '231px'
							}}
							to={
								movie.media_type
									? `/${movie.media_type}/${movie.id}`
									: `movie/${movie.id}`
							}>
							<div className="card thumbnail grey darken-3 white-text"
								style={{
									width: '154px',
									height: '231px',
									display: 'flex',
									textAlign: 'center',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<p style={{ margin: '0 .5rem' }}>{movie.title ? movie.title : movie.name}</p>
							</div>
						</Link>
				}
			</div>
			<div id={`${movie.id}-rating`} style={{ width: '100%', position: 'absolute', bottom: movie.profile_path ? '-22px' : '-25px' }}>
				<MovieRating movie={movie} />
			</div>
		</div>
	);
};

Movie.propTypes = {
	movie: PropTypes.object.isRequired
}

export default Movie;
