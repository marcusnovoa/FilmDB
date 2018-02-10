import React, { Component } from 'react';
import Overdrive from 'react-overdrive';
import './MovieDetail.css';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
    state = {
        movie: {},
    }

    async componentDidMount() {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}&language=en-US`);
            const movie = await res.json();

            this.setState({
                movie,
            });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { movie } = this.state;
        return (
            <div className="MovieDetail">
                <img src={`${BACKDROP_PATH}${movie.backdrop_path}`} alt={movie.title} />
                <Overdrive id={`${movie.id}`}>
                    <img className="card" src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                </Overdrive>
                <h1>{movie.title}</h1>
                <h3>{movie.release_date}</h3>
                <p>{movie.overview}</p>
            </div>
        );
    }
}

export default MovieDetail;