import React, { Component } from 'react';
import lodash from 'lodash';

// Context
export const MyContext = React.createContext();
// Provider Component
export default class MyProvider extends Component {
	state = {
		pages: [],
		movies: [],
		pageNum: 1,
		keyword: '',
		videoPlayer: {
			playVideo: false,
			videoPath: ''
		},
		personDetail: {
			person: {},
			castingChunked: [],
			casting: [],
			castingIndex: 0,
			lastId: ''
		}
	};
	fetchMovies = async pageReset => {
		const keyword = document.getElementById('search').value;
		const pageNum = pageReset ? pageReset : this.state.pageNum;
		const url =
			keyword === ''
				? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
				: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${this.state.keyword}&include_adult=false&page=${this.state.pageNum}`;
		try {
			const res = await fetch(url);
			const movies = await res.json();

			this.setState({
				pages: movies,
				movies: movies.results
			});
		} catch (err) {
			console.log(err);
		}
	}
	fetchPersonCasting = async cIndex => {
		try {
			const res = await fetch(
				`http://api.themoviedb.org/3/person/${window.location.pathname.split('/')[2]}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&append_to_response=movie_credits,tv_credits`
			);
			const person = await res.json();
			const castMovies = person.movie_credits.cast.map(mov => ({
				id: mov.id,
				title: mov.title,
				poster_path: mov.poster_path,
				vote_average: mov.vote_average,
				release_date: mov.release_date,
				media_type: 'movie'
			}));
			const castShows = person.tv_credits.cast.map(show => ({
				id: show.id,
				title: show.name,
				poster_path: show.poster_path,
				vote_average: show.vote_average,
				release_date: show.first_air_date,
				media_type: 'tv'
			}));
			let castingFull = castMovies.concat(castShows)
				.sort(function(a,b) {return (a.release_date < b.release_date) ? 1 : ((b.release_date < a.release_date) ? -1 : 0)});
			castingFull = lodash.uniqBy(castingFull, cast => cast.id);
			const castingChunked = lodash.chunk(castingFull, 20);
			const casting = castingChunked[cIndex];

			this.setState({
				personDetail: {
					...this.state.personDetail,
					person,
					castingChunked,
					casting
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					fetchMovies: this.fetchMovies,
					fetchPersonCasting: this.fetchPersonCasting,
					keywordSearch: async () => {
						this.setState({ pageNum: 1 });
						const keyword = document.getElementById('search').value;

						this.setState({
							pageNum: 1,
							keyword
						});

						if (keyword !== '') {
							try {
								const res = await fetch(
									`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&include_adult=false&page=1`
								);
								const movies = await res.json();

								this.setState({
									pages: movies,
									movies: movies.results
								});
							} catch (err) {
								console.log(err);
							}
						} else {
							this.fetchMovies(1);
						}
					},
					handlePageClick: async e => {
						const pageNum = e.selected + 1;
						const keyword = document.getElementById('search').value;

						if (keyword === '') {
							try {
								const res = await fetch(
									`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
								);
								const movies = await res.json();

								this.setState({
									movies: movies.results,
									pageNum
								});
							} catch (err) {
								console.log(err);
							}
						} else {
							const pageNum = e.selected + 1;

							try {
								const res = await fetch(
									`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&include_adult=false&page=${pageNum}`
								);
								const movies = await res.json();

								this.setState({
									pages: movies,
									movies: movies.results,
									pageNum
								});
							} catch (err) {
								console.log(err);
							}
						}
					},
					handlePersonPageClick: e => {
						const castingIndex =  e ?
																		e.selected :
																	this.state.personDetail.castingIndex ?
																 		this.state.personDetail.castingIndex :
																	0;
						let lastId = window.location.pathname.split('/')[2];
						if (this.state.personDetail.lastId === '') {
							this.setState({
								personDetail: {
									...this.state.personDetail,
									castingIndex,
									lastId
								}
							});
							this.fetchPersonCasting(castingIndex);
						} else {
							if (lastId === this.state.personDetail.lastId) {
								this.setState({
									personDetail: {
										...this.state.personDetail,
										castingIndex
									}
								});
								this.fetchPersonCasting(castingIndex);
							} else {
								lastId = window.location.pathname.split('/')[2];
								this.setState({
									personDetail: {
										...this.state.personDetail,
										castingIndex: 0,
										lastId
									}
								});
								this.fetchPersonCasting(0);
							}
						}
					},
					openVideo: e => {
						const videoPathArr = e.target.classList.contains('play-btn') ?
							e.target.nextSibling.src.split('/') :
							e.target.src.split('/');
						const videoPath = videoPathArr[4];
						this.setState({
							videoPlayer: {
								playVideo: true,
								videoPath
							}
						});
					},
					closeVideo: () => {
						const videoPath = '';
						this.setState({
							videoPlayer: {
								playVideo: false,
								videoPath
							}
						});
					}
				}}
			>
				{this.props.children}
			</MyContext.Provider>
		);
	}
};
