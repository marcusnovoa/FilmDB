import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import './MovieDetail.css';

import MovieRating from '../MovieRating/MovieRating';
import CastThumbnail from '../CastThumbnail/CastThumbnail';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';
import Slider from '../../../node_modules/react-slick/lib/slider';
import { WindowSpinner } from '../Spinner/Spinner';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
    castInfo: [],
    videos: [],
    thumbHeight: 0
  };

  componentWillMount() {
    const { windowIsLoading } = this.props.context;
    windowIsLoading();
  }

  componentWillUnmount() {
    const { closeVideo } = this.props.context;
    closeVideo();
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const { context, match } = this.props;
    const { castImages } = this.state;
    const url = `https://api.themoviedb.org/3/${match.params.mediaType}/${match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US&include_adult=false&append_to_response=credits,videos`;

    try {
      const movie = await fetch(url)
        .then(data => data.json());
      const castInfo = movie.credits.cast.map(member => ({
        name: member.name,
        character: member.character,
        id: member.id,
        image: member.profile_path,
      }));
      const videos = movie.videos.results.map(vid => ({
        name: vid.name,
        path: vid.key
      }));

      this.setState({
        movie,
        castInfo,
        videos
      });

      this.getCastImages = () => {
        castImages.map(image => {
          return <CastThumbnail path={image} />;
        });
      };
      context.doneLoading();
      context.windowDoneLoading();
    } catch (err) {
      console.log(err);
    }

    // Retrieve Movie Genres
    const { movie } = this.state;
    if (movie.genres.length > 0) {
      const genres = Array.from(movie.genres);
      const genreNames = genres.map(genre => {
        return genre.name;
      });
      const genreString = genreNames.join(', ');
      document.getElementById('genres').innerText = `Genres: ${genreString}`;
    }

    this.setState({ thumbHeight: document.querySelector('.thumbnail').clientHeight });
  }

  render() {
    const { castInfo, movie, videos } = this.state;
    const { context, match } = this.props;
    const castInfoLength = castInfo.length >= 3 ? 3 : castInfo.length;
    const videosLength = videos.length >= 3 ? 3 : videos.length;
    const castSettings = {
      dots: true,
      className: 'cast-slider',
      infinite: true,
      speed: 500,
      slidesToShow: castInfoLength,
      slidesToScroll: castInfoLength,
      slidesPerRow: castInfo.length > 5 ? 2 : 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: castInfo.length > 1 ? 2 : 1,
            slidesToScroll: castInfo.length > 1 ? 2 : 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const videosSettings = {
      dots: true,
      className: 'video-slider',
      infinite: true,
      speed: 500,
      slidesToShow: videosLength,
      slidesToScroll: videosLength,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 880,
          settings: {
            slidesToShow: videos.length > 1 ? 2 : 1,
            slidesToScroll: videos.length > 1 ? 2 : 1
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

    return (
      <Fragment>
        {context.state.windowLoading ?
          <WindowSpinner /> : null}
        {context.state.videoPlayer.playVideo ?
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 999
          }}
            onClick={context.closeVideo}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: isIE ? '95%' : '100%',
              position: 'absolute',
              top: 0
            }}>
              <i
                className="material-icons white-text"
                style={{ fontSize: '2rem', margin: '1rem 1rem 0 0', cursor: 'pointer' }}
                onClick={context.closeVideo}>
                close
							</i>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${context.state.videoPlayer.videoPath}?autoplay=1`}
              width="90%" height="75%" frameBorder="0" title={`videoplayer-${match.params.id}`} allowFullScreen></iframe>
          </div> : null
        }
        <MovieWrapper
          className="MovieDetail"
          backdrop={movie.backdrop_path ? `${BACKDROP_PATH}${movie.backdrop_path}` : null}
          style={{ paddingTop: movie.backdrop_path ? '50vh' : '6rem' }}>
          <div className="MovieInfo">
            <div className="container">
              <div className="row">
                <div className="col s12 m2" style={{ position: 'relative' }}>
                  <div id={`${movie.id}`}>
                    {movie.poster_path ?
                      <img
                        className="card thumbnail"
                        src={`${POSTER_PATH}${movie.poster_path}`}
                        alt={movie.title ? `${movie.title}` : `${movie.name}`}
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
                        <p>{movie.title ? movie.title : movie.name}</p>
                      </div>
                    }
                  </div>
                  <div
                    id={`${movie.id}-rating`}
                    className="rating-wrapper"
                    style={{
                      width: '154px',
                      position: 'absolute',
                      marginTop: movie.poster_path ? '-11px' : '-5px'
                    }}>
                    <MovieRating movie={movie} />
                  </div>
                </div>
                <div className="col s12 m10">
                  <div className="card info grey darken-3">
                    <h4 className="movie-title white-text">
                      {movie.title ? movie.title : movie.name}
                    </h4>
                    {movie.tagline ?
                      <p className="movie-tagline white-text">{movie.tagline}</p> : null
                    }
                    {movie.release_date || movie.first_air_date ?
                      <p
                        className="grey-text text-darken-2"
                        style={{
                          marginBottom: movie.overview || movie.genres.length > 0 ? '15px' : 0
                        }}>
                        Release Date:{' '}
                        {movie.release_date
                          ? moment(movie.release_date).format('LL')
                          : moment(movie.first_air_date).format('LL')}
                      </p> : null
                    }
                    {movie.overview ?
                      <p className="white-text">{movie.overview}</p> : null
                    }
                    {movie.genres ?
                      <p
                        id="genres"
                        className="movie-genres grey-text text-darken-2"
                        style={{ marginTop: movie.genres.length > 0 ? '15px' : 0 }}
                      /> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MovieWrapper>
        {castInfo.length > 0 ?
          <div className="MovieCast container">
            <div className="row slider-row">
              <div className="col s12">
                <h5 className="slider-title">
                  Cast List
								</h5>
                <Slider {...castSettings}>
                  {castInfo.map(member => (
                    <CastThumbnail
                      key={member.image}
                      member={member}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div> : null
        }
        {videos.length > 0 ?
          <div className="VideosList container">
            <div className="row slider-row">
              <div className="col s12">
                <h5 className="slider-title">
                  Videos
								</h5>
                <Slider {...videosSettings}>
                  {videos.map(vid => (
                    <VideoThumbnail key={vid.path} name={vid.name} url={vid.path} play={context.openVideo} />
                  ))}
                </Slider>
              </div>
            </div>
          </div> : null
        }
      </Fragment>
    );
  }
}

MovieDetail.propTypes = {
  context: PropTypes.object.isRequired
}

const MovieWrapper = styled.div`
	position: relative;
	background: url(${props => props.backdrop}) no-repeat;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
`;

export default MovieDetail;
