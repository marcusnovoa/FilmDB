import React from 'react';
import MovieDetail from '../MovieDetail/MovieDetail';

import { MyContext } from '../../containers/App';

const MyMovieDetail = props => {
  return (
    <MyContext.Consumer>
      {context =>
        <MovieDetail context={ context } {...props} />
      }
    </MyContext.Consumer>
  );
}

export default MyMovieDetail;
