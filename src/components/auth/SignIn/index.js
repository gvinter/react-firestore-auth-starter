import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from 'components/view/auth';

import { SignUpLink } from 'components/auth/SignUp';
import { PasswordForgetLink } from 'components/auth/PasswordForget';
import { withFirebase } from 'components/base/Firebase';
import * as ROUTES from 'constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignInPage;

export { SignInForm };
