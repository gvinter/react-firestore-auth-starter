import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from 'components/base/Session';
import SignOutButton from 'components/views/auth/SignOut';
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.THINGS}>Things</Link>
    </li>
    <li>
      <Link to={ROUTES.PRIVACY}>Privacy</Link>
    </li>
    <li>
      <Link to={ROUTES.SETTINGS}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.THINGS}>Things</Link>
    </li>
    <li>
      <Link to={ROUTES.PRIVACY}>Privacy</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
