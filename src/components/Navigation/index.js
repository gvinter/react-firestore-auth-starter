import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from 'components/base/Session';
import SignOutButton from 'components/auth/SignOut';
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';

import { Flex, Box, Text } from '@chakra-ui/core';

const NavLink = ({ children, ...props }) => (
  <Link {...props} style={{ padding: '0.5em' }}>
    {children}
  </Link>
);

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Flex
        w="100%"
        maxWidth="1250px"
        mx="auto"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight={700} pl={3} pr={8}>
            <Link to={ROUTES.HOME}>App Name</Link>
          </Text>
          <NavLink to={ROUTES.THINGS}>Things</NavLink>
        </Flex>

        <Box>
          {authUser && (
            <NavLink to={ROUTES.SETTINGS}>Account</NavLink>
          )}
          {!authUser && (
            <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
          )}
          {authUser && !!authUser.roles[ROLES.ADMIN] && (
            <NavLink to={ROUTES.ADMIN}>Admin</NavLink>
          )}
          {authUser && <SignOutButton />}
        </Box>
      </Flex>
    )}
  </AuthUserContext.Consumer>
);

export default Navigation;
