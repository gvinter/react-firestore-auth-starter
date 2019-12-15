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

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

export default SignInPage;

export { SignInForm };
