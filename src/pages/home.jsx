import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/core';

const HomePage = () => (
  <Box m="50px auto" maxWidth="950px">
    <Heading>Home Page</Heading>
    <Text>The Home Page is accessible by every signed in user.</Text>
  </Box>
);

export default HomePage;
