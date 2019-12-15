import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';

import { Flex, Box, Text } from '@chakra-ui/core';

const NavLink = ({ children, ...props }) => (
  <Link {...props} style={{ padding: '0.5em' }}>
    {children}
  </Link>
);

const Footer = () => (
  <Flex
    w="100%"
    maxWidth="1250px"
    mx="auto"
    borderTop="1px solid #eee"
    mt={10}
    px={5}
    py={5}
    justifyContent="space-between"
    alignItems="center"
  >
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Text pl={3}>App Name</Text>
    </Flex>

    <Box>
      <NavLink to={ROUTES.PRIVACY}>Privacy</NavLink>
      <NavLink to={ROUTES.TERMS}>Terms</NavLink>
    </Box>
  </Flex>
);

export default Footer;
