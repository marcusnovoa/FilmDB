import React, { Component, Fragment } from 'react';
import './MoviesList.css';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types'

import Movie from '../Movie/Movie';
import { Spinner, WindowSpinner } from '../Spinner/Spinner';
import MoviesListWrapper from '../MoviesListWrapper/MoviesListWrapper';

class MoviesList extends Component {
  componentWillMount() {
    const { windowIsLoading } = this.props.context;
    windowIsLoading();
  }

  componentDidMount() {
    const { fetchMovies } = this.props.context;
    const { keyword } = this.props.context.state;
    fetchMovies();

    if (keyword !== '') {
      document.getElementById('search-label').classList.add('active');
    }
  }

  render() {
    const { context } = this.props;
    const { state } = this.props.context;
    return (
      <Fragment>
        {state.windowLoading ?
          <WindowSpinner /> : null}
        <div className="MoviesList">
          <div className="container title">
            <div className="row">
              <div className="col s12">
                <h4 className="list-title white-text">Welcome to FilmDB</h4>
                <p className="list-subtitle white-text">
                  All of your basic movie and TV show information stored in one
									place.
								</p>
              </div>
            </div>
            <div className="row filter">
              <div className="col s12 white-text">
                <div className="input-field">
                  <i className="material-icons prefix">search</i>
                  <input
                    id="search"
                    type="text"
                    className="search-input"
                    onChange={context.keywordSearch}
                    value={state.keyword}
                  />
                  <label
                    id="search-label"
                    htmlFor="search"
                    data-error="wrong"
                    data-success="right"
                  >
                    Search for Movies and TV Shows...
									</label>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: '2rem 0 4rem 0'
            }}
          >
            <ReactPaginate
              activeClassName={'active'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              initialPage={state.pageNum - 1}
              forcePage={state.pageNum - 1}
              previousLabel={'Prev'}
              nextLabel={'Next'}
              pageCount={state.pages.total_pages}
              marginPagesDisplayed={0}
              pageRangeDisplayed={7}
              onPageChange={context.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
            />
          </div>
          <MoviesListWrapper>
            {state.isLoading ?
              <Spinner /> :
              state.movies.map(movie => <Movie key={movie.id} movie={movie} />)};
					</MoviesListWrapper>
        </div>
      </Fragment>
    );
  }
}

MoviesList.propTypes = {
  context: PropTypes.object.isRequired
}

export default MoviesList;
