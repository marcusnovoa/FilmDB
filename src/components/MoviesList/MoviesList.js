import React, { Component } from 'react';
import './MoviesList.css';
import ReactPaginate from 'react-paginate';

import Movie from '../Movie/Movie';

class MoviesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            movies: [],
            pageNum: 1
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.props.context.state.fetchMovies();
    }

    async handlePageClick(e) {
        const pageNum = e.selected + 1;
        const keyword = document.getElementById('search').value;

        if(keyword === '') {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
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
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&query=${keyword}&page=${pageNum}`);
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
    }

    render() {
        return (
            <div className="MoviesList">
                <div className="container title">
                    <div className="row">
                        <div className="col s12">
                            <h4 className="list-title white-text">Welcome to FilmDB</h4>
                            <p className="list-subtitle white-text">All of your basic movie and TV show information stored in one place.</p>
                        </div>
                    </div>
                    <div className="row filter">
                        <div className="col s12 white-text">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input id="search" type="text" className="search-input" onChange={this.props.context.keywordSearch}></input>
                                <label htmlFor="search" data-error="wrong" data-success="right">Search for Movies and TV Shows...</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <ReactPaginate previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={this.state.pages.total_pages}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={7}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                <div className="container movies">
                    {this.props.context.state.movies.map(movie => {
                        if(movie.poster_path) {
                            return <Movie key={movie.id} movie={movie} />;
                        } else {
                            return null;
                        }
                    })};
                </div>
            </div>
        );
    }
}

export default MoviesList;
