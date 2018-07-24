import React, { Component, Fragment } from 'react';
import ReactPaginate from 'react-paginate';

import Movie from '../Movie/Movie';
import MoviesListWrapper from '../MoviesListWrapper/MoviesListWrapper';

class PersonDetail extends Component {
  componentDidMount() {
    this.props.context.handlePersonPageClick();
  }

  render() {
    return (
      <Fragment>
        <div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '3rem'
					}}>
          <ReactPaginate
            activeClassName={'active'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            initialPage={this.props.context.state.personDetail.castingIndex}
            forcePage={this.props.context.state.personDetail.castingIndex}
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={this.props.context.state.personDetail.castingChunked.length}
            marginPagesDisplayed={0}
            pageRangeDisplayed={7}
            onPageChange={this.props.context.handlePersonPageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
          />
        </div>
        <MoviesListWrapper>
          {this.props.context.state.personDetail.casting ?
            this.props.context.state.personDetail.casting.map(mov =>
              <Movie key={mov.id} movie={mov} />
            ) : null
          }
        </MoviesListWrapper>
      </Fragment>
    );
  }
}

export default PersonDetail;
