import React from 'react';
import MovieDetail from '../MovieDetail/MovieDetail';

import { MyContext } from '../../context';

const myMovieDetail = props => {
  return (
    <MyContext.Consumer>
      {context =>
        <MovieDetail context={context} {...props} />
      }
    </MyContext.Consumer>
  );
}

export default myMovieDetail;
