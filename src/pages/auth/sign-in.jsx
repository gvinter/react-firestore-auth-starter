import React from 'react';

import { SignUpLink } from 'components/auth/SignUp';

import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from 'components/auth/SignIn';

import { Flex, Heading, Box, Divider } from '@chakra-ui/core';

const SignInPage = () => (
  <Box mx="auto" maxWidth="xs" my={10}>
    <Heading mb={5}>Sign In</Heading>
    <SignUpLink />
    <Flex my={5} flexDirection="column">
      <Flex flexDirection="column" justifyContent="center">
        <Box mb={2}>
          <SignInGoogle />
        </Box>
        <Box mb={2}>
          <SignInFacebook />
        </Box>
        <Box mb={2}>
          <SignInTwitter />
        </Box>
      </Flex>
      <Divider my={10} />
      <SignInForm />
    </Flex>
  </Box>
);

export default SignInPage;
