import React from 'react';
import PersonDetail from '../PersonDetail/PersonDetail';

import { MyContext } from '../../context';

const myPersonDetail = props => {
  return (
    <MyContext.Consumer>
      {context =>
        <PersonDetail context={context} {...props} />
      }
    </MyContext.Consumer>
  );
}

export default myPersonDetail;
