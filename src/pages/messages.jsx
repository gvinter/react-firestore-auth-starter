import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  withEmailVerification,
} from 'components/base/Session';

import Messages from 'components/Messages';

const MessagesPage = () => (
  <div>
    <h1>Messages landing Page</h1>
    <p>This page is accessible signed in users only.</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MessagesPage);
