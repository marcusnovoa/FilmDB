import React from 'react';
import { Link } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import './Movie.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => {
	let bgColor;
	if (movie.vote_average >= 7) {
		bgColor = '#27ae60';
	} else if (movie.vote_average >= 5) {
		bgColor = '#f39c12';
	} else if (movie.vote_average >= 3) {
		bgColor = '#d35400';
	} else {
		bgColor = '#c0392b';
	}

	return (
		<div className="Movie">
			<Link
				to={
					movie.media_type
						? `/${movie.media_type}/${movie.id}`
						: `movie/${movie.id}`
				}
			>
				<Overdrive id={`${movie.id}`} className="ThumbnailCon">
					{movie.poster_path ?
						<img
							className="card thumbnail"
							src={`${POSTER_PATH}${movie.poster_path}`}
							alt={movie.title ? `${movie.title}` : `${movie.name}`}
						/> :
					movie.profile_path ?
						<img
							className="card thumbnail"
							src={`${POSTER_PATH}${movie.profile_path}`}
							alt={movie.name}
						/> :
						<div className="card thumbnail grey darken-3 white-text"
							style={{
								width: '154px',
								height: '231px',
								display: 'flex',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center' }}>
							<p>{movie.title ? movie.title : movie.name}</p>
						</div>
					}
				</Overdrive>
				{movie.vote_average ?
					<div className="RatingCon">
						<div className="Rating" style={{ backgroundColor: bgColor }}>
							<i className="material-icons">star_rate</i>
							<p>{`${movie.vote_average}`}</p>
						</div>
					</div> : 
				movie.media_type === 'person' ?
					<div className="RatingCon">
						<div className="Rating" style={{ backgroundColor: '#3498db' }}>
							<i className="material-icons">person</i>
						</div>
					</div> :
					<div className="RatingCon">
						<div className="Rating" style={{ backgroundColor: bgColor }}>
							<i className="material-icons">star_rate</i>
							<p>0</p>
						</div>
					</div>
				}
			</Link>
		</div>
	);
};

export default Movie;
