import React, { Component, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import moment from 'moment';
import lodash from 'lodash';
import './PersonDetail.css';

import Movie from '../Movie/Movie';
import MoviesListWrapper from '../MoviesListWrapper/MoviesListWrapper';
import { Spinner, WindowSpinner } from '../Spinner/Spinner';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w154';

class PersonDetail extends Component {
  componentWillMount() {
    const { windowIsLoading } = this.props.context;
    windowIsLoading();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { handlePersonPageClick } = this.props.context;
    handlePersonPageClick();
  }

  render() {
    const { context } = this.props;
    const { state } = this.props.context;
    const { person } = this.props.context.state.personDetail;
    const ageBirth = person.birthday ? moment().diff(person.birthday, 'years') : null;
    const deathDay = person.deathday ? moment(person.deathday) : null;
    const ageDeath = person.deathday ? deathDay.diff(person.birthday, 'years') : null;
    const placeBirth = person.place_of_birth ? lodash.includes(person.place_of_birth, ' - ') ? person.place_of_birth.replace(/ - /g, ', ') : person.place_of_birth : null;
    return (
      <Fragment>
        {state.windowLoading ?
          <WindowSpinner /> : null}
        <div className="PersonInfo">
          <div className="container">
            <div className="row">
              <div
                className="col profile s12 m2"
                style={{
                  height: '256px',
                  position: 'relative'
                }}>
                <div id={`${person.id}`}>
                  {person.profile_path ?
                    <img
                      className="card thumbnail"
                      src={`${PROFILE_PATH}${person.profile_path}`}
                      alt={person.name}
                    /> :
                    <div className="card thumbnail grey darken-3 white-text"
                      style={{
                        width: '154px',
                        height: '231px',
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <p style={{ margin: '0 .5rem' }}>{person.name}</p>
                    </div>
                  }
                </div>
              </div>
              <div className="col bio s12 m10">
                <div
                  className="card info grey darken-3"
                  style={{
                    padding: '2rem'
                  }}>
                  <h4
                    className="person-name white-text"
                    style={{
                      marginTop: 0,
                      marginBottom: person.place_of_birth || person.birthday || person.biography ? '15px' : 0
                    }}>
                    {person.name}
                  </h4>
                  {person.place_of_birth ?
                    <p className="movie-tagline white-text">
                      {`Born In: ${placeBirth}`}
                    </p> : null
                  }
                  {person.deathday && person.birthday ?
                    <p
                      className="grey-text text-darken-2"
                      style={{
                        marginBottom: person.biography ? '15px' : 0
                      }}>
                      Lived:{' '}
                      {`${moment(person.birthday).format('LL')} - ${moment(person.deathday).format('LL')} (Age ${ageDeath})`}
                    </p> :
                    person.deathday ?
                      <p
                        className="grey-text text-darken-2"
                        style={{
                          marginBottom: person.biography ? '15px' : 0
                        }}>
                        Died:{' '}
                        {moment(person.deathday).format('LL')}
                      </p> :
                      person.birthday ?
                        <p
                          className="grey-text text-darken-2"
                          style={{
                            marginBottom: person.biography ? '15px' : 0
                          }}>
                          Birthday:{' '}
                          {`${moment(person.birthday).format('LL')} (Age ${ageBirth})`}
                        </p> : null
                  }
                  {person.biography ?
                    <p className="white-text" style={{ marginBottom: 0 }}>{person.biography}</p> : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '4rem 0'
          }}>
          <ReactPaginate
            activeClassName={'active'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            initialPage={state.personDetail.castingIndex}
            forcePage={state.personDetail.castingIndex}
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={state.personDetail.castingChunked.length}
            marginPagesDisplayed={0}
            pageRangeDisplayed={7}
            onPageChange={context.handlePersonPageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
          />
        </div>
        {state.personDetail.casting ?
          <h5 className="slider-title" style={{ margin: '0 0 2rem 0' }}>
            Casting Roles
          </h5> : null
        }
        <MoviesListWrapper>
          {state.isLoading ?
            <Spinner /> :
            state.personDetail.casting ?
              state.personDetail.casting.map(mov =>
                <Movie key={mov.id} movie={mov} />
              ) : null
          }
        </MoviesListWrapper>
      </Fragment>
    );
  }
}

PersonDetail.propTypes = {
  context: PropTypes.object.isRequired
}

export default PersonDetail;
