import React from 'react';
import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.JOIN}>Join</Link>
  </p>
);

export default SignUpLink;
