import React, { Component } from 'react';

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
		fetchMovies: async () => {
			const keyword = document.getElementById('search').value;
			const url =
				keyword === ''
					? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
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
	};
	render() {
		return (
			<MyContext.Provider
				value={{
					state: this.state,
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
							this.state.fetchMovies();
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
