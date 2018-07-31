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
		isLoading: true,
		windowLoading: true,
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
	isLoading = () => this.setState({ isLoading: true });
	doneLoading = async () => this.setState({ isLoading: await false });
	windowIsLoading = () => this.setState({ windowLoading: true });
	windowDoneLoading = async () => this.setState({ windowLoading: await false });
	fetchMovies = async pageReset => {
		this.isLoading();
		const keyword = document.getElementById('search').value;
		const pageNum = pageReset ? pageReset : this.state.pageNum;
		const url =
			keyword === ''
				? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
				: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${this.state.keyword}&include_adult=false&page=${this.state.pageNum}`;
		try {
			const movies = await fetch(url)
				.then(data => data.json());
			let moviesArr = movies.results;
			moviesArr = lodash.uniqBy(moviesArr, mov => mov.id);

			this.setState({
				pages: movies,
				movies: moviesArr
			});
			this.doneLoading();
			this.windowDoneLoading();
		} catch (err) {
			console.log(err);
		}
	}
	fetchPersonCasting = async cIndex => {
		this.isLoading();
		const url = `http://api.themoviedb.org/3/person/${window.location.pathname.split('/')[2]}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&append_to_response=movie_credits,tv_credits`;
		try {
			const person = await fetch(url)
				.then(data => data.json());
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
			this.doneLoading();
			this.windowDoneLoading();
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
					isLoading: this.isLoading,
					doneLoading: this.doneLoading,
					windowIsLoading: this.windowIsLoading,
					windowDoneLoading: this.windowDoneLoading,
					fetchMovies: this.fetchMovies,
					fetchPersonCasting: this.fetchPersonCasting,
					keywordSearch: async () => {
						const keyword = document.getElementById('search').value;
						const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&include_adult=false&page=1`;
						this.isLoading();

						this.setState({
							pageNum: 1,
							keyword
						});

						if (keyword !== '') {
							try {
								const movies = await fetch(url)
									.then(data => data.json());
								let moviesArr = movies.results;
								moviesArr = lodash.uniqBy(moviesArr, mov => mov.id);

								this.setState({
									pages: movies,
									movies: moviesArr
								});

								this.doneLoading();
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
						this.isLoading();

						if (keyword === '') {
							const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`;
							try {
								const movies = await fetch(url)
									.then(data => data.json());

								this.setState({
									movies: movies.results,
									pageNum
								});

								this.doneLoading();
							} catch (err) {
								console.log(err);
							}
						} else {
							const pageNum = e.selected + 1;
							const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&include_adult=false&page=${pageNum}`;

							try {
								const movies = await fetch(url)
									.then(data => data.json());

								this.setState({
									pages: movies,
									movies: movies.results,
									pageNum
								});

								this.doneLoading();
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
