import React from 'react';
import MoviesList from '../MoviesList/MoviesList';

import { MyContext } from '../../context';

const myMoviesList = props => {
  return (
    <MyContext.Consumer>
      {context =>
        <MoviesList context={ context } {...props} />
      }
    </MyContext.Consumer>
  );
}

export default myMoviesList;
