import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from 'components/base/Firebase';
import { PasswordForgetLink } from 'components/auth/PasswordForget';
import * as ROUTES from 'constants/routes';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Heading,
} from '@chakra-ui/core';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Heading as="h2" fontWeight="500" fontSize="lg" mb={3}>
          Or sign in with email
        </Heading>
        <FormControl mb={3}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
            placeholder="Email address"
          />
        </FormControl>

        <FormControl>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            placeholder="password"
          />
        </FormControl>

        <Button
          disabled={isInvalid}
          variantColor="blue"
          type="submit"
          mt={5}
        >
          Sign In
        </Button>

        {error && <p>{error.message}</p>}

        <PasswordForgetLink />
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
