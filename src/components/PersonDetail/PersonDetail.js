import React, { Component, Fragment } from 'react';
import Overdrive from 'react-overdrive';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './PersonDetail.css';

import Movie from '../Movie/Movie';
import MoviesListWrapper from '../MoviesListWrapper/MoviesListWrapper';

const PROFILE_PATH = 'https://image.tmdb.org/t/p/w154';

class PersonDetail extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.context.handlePersonPageClick();
  }

  render() {
    const person = this.props.context.state.personDetail.person;
    const ageBirth = moment().diff(person.birthday, 'years');
    const deathDay = person.deathday ? moment(person.deathday) : null;
    const ageDeath = person.deathday ? deathDay.diff(person.birthday, 'years') : null;
    return (
      <Fragment>
        <div className="PersonInfo">
          <div className="container">
            <div className="row">
              <div
                className="col profile s12 m2"
                style={{
                  height: '256px',
                  position: 'relative'
                }}>
                <Overdrive id={`${person.id}`}>
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
                        alignItems: 'center' }}>
                      <p style={{ margin: '0 .5rem' }}>{person.name}</p>
                    </div>
                  }
                </Overdrive>
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
                      {`Born In: ${person.place_of_birth}`}
                    </p> : null
                  }
                  {person.deathday ?
                    <p
                      className="grey-text text-darken-2"
                      style={{
                        marginBottom: person.biography ? '15px' : 0
                      }}>
                        Lived:{' '}
                        {`${moment(person.birthday).format('LL')} - ${moment(person.deathday).format('LL')} (Age ${ageDeath})`}
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
        {this.props.context.state.personDetail.casting ?
          <h5 className="slider-title" style={{ margin: '0 0 2rem 0' }}>
            Casting Roles
          </h5> : null
        }
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
