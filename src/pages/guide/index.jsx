import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  withEmailVerification,
} from 'components/base/Session';

const GuidePage = () => (
  <div>
    <h1>Guide Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GuidePage);
