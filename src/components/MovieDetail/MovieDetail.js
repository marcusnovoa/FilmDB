import React, { Component, Fragment } from 'react';
import Overdrive from 'react-overdrive';
import styled from 'styled-components';
import './MovieDetail.css';

import CastThumbnail from '../CastThumbnail/CastThumbnail';
import Slider from '../../../node_modules/react-slick/lib/slider';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
	state = {
		movie: {},
		castInfo: []
	};

	async componentDidMount() {
		try {
			const res = await fetch(
				`https://api.themoviedb.org/3/${this.props.match.params.mediaType}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&include_adult=false&append_to_response=credits,videos`
			);
			const movie = await res.json();
			const castInfo = movie.credits.cast.map(member => ({
				name: member.name,
				image: member.profile_path
			}));

			this.setState({
				movie,
				castInfo
			});

			this.getCastImages = () => {
				this.state.castImages.map(image => {
					return <CastThumbnail path={image} />;
				});
			};
		} catch (err) {
			console.log(err);
		}

		// Retrieve Movie Genres
		const { movie } = this.state;
		if (movie.genres) {
			const genres = Array.from(movie.genres);
			const genreNames = genres.map(genre => {
				return genre.name;
			});
			const genreString = genreNames.join(', ');
			document.getElementById('genres').innerText = `Genres: ${genreString}`;
		}
	}

	render() {
		const { movie } = this.state;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 6,
			slidesToScroll: 6
		};

		return (
			<Fragment>
				<MovieWrapper
					className="MovieDetail"
					backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
				>
					<div className="MovieInfo">
						<div className="container">
							<div className="row">
								<div className="col s12 m2">
									<Overdrive id={`${movie.id}`}>
										<img
											className="card"
											src={`${POSTER_PATH}${movie.poster_path}`}
											alt={movie.title ? movie.title : movie.name}
										/>
									</Overdrive>
								</div>
								<div className="col s12 m10">
									<div className="card info grey darken-3">
										<h4 className="movie-title white-text">
											{movie.title ? movie.title : movie.name}
										</h4>
										<p className="movie-tagline white-text">{movie.tagline}</p>
										<p className="grey-text text-darken-2">
											Release Date:{' '}
											{movie.release_date
												? movie.release_date
												: movie.first_air_date}
										</p>
										<p className="white-text">{movie.overview}</p>
										<p
											id="genres"
											className="movie-genres grey-text text-darken-2"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MovieWrapper>
				<div className="MovieCast container">
					<div className="row">
						<div className="col s12">
							<h5
								style={{
									color: '#fff',
									textAlign: 'center',
									margin: '1rem 0 0 0'
								}}
							>
								Cast List
							</h5>
							<Slider {...settings}>
								{this.state.castInfo.map(member => (
									<CastThumbnail
										key={member.image}
										name={member.name}
										path={member.image}
									/>
								))}
							</Slider>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const MovieWrapper = styled.div`
	position: relative;
	padding-top: 50vh;
	background: url(${props => props.backdrop}) no-repeat;
	background-size: cover;
	background-position: center;
`;

export default MovieDetail;
