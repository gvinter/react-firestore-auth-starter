import React from 'react';
import { compose } from 'recompose';

import {
  withAuthorization,
  withEmailVerification,
} from 'components/base/Session';

import { Heading, Box, Text } from '@chakra-ui/core';

import Messages from 'components/Messages';

const MessagesPage = () => (
  <Box m="50px auto" maxWidth="950px">
    <Heading>Messages landing Page</Heading>
    <Text>This page is accessible signed in users only.</Text>
    <Box my="50px">
      <Messages />
    </Box>
  </Box>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(MessagesPage);
