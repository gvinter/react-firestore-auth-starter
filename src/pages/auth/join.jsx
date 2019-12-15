import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from 'components/base/Firebase';
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';

import SignUpForm from 'components/auth/SignUp';

import { Box, Heading } from '@chakra-ui/core';

const JoinPage = () => (
  <Box maxWidth="sm" mx="auto" my={10}>
    <Heading as="h1" mb={5}>
      Sign Up
    </Heading>
    <SignUpForm />
  </Box>
);

export default JoinPage;
