import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from 'components/base/Firebase';
import * as ROUTES from 'constants/routes';

import { FormControl, Input, Button } from '@chakra-ui/core';

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_EMAIL_IN_USE = 'auth/email-already-in-use';

const ERROR_MSG_EMAIL_ACCOUNT_EXISTS = `
  An account with this email address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, email, passwordOne } = this.state;
    const roles = {};

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            name,
            email,
            roles,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_EMAIL_IN_USE) {
          error.message = ERROR_MSG_EMAIL_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '';

    return (
      <form onSubmit={this.onSubmit}>
        <FormControl mb={3}>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
            placeholder="Full Name"
          />
        </FormControl>

        <FormControl mb={3}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="Email address"
          />
        </FormControl>

        <FormControl mb={3}>
          <Input
            type="password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            placeholder="Password"
          />
        </FormControl>

        <FormControl mb={3}>
          <Input
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            placeholder="Confirm password"
          />
        </FormControl>

        <Button
          disabled={isInvalid}
          type="submit"
          variantColor="blue"
        >
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpForm;
