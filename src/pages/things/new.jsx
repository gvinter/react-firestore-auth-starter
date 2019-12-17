import React, { useState, useContext } from 'react';
import { compose } from 'recompose';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'components/base/Firebase';
import { AuthUserContext } from 'components/base/Session';
import {
  withAuthorization,
  withEmailVerification,
} from 'components/base/Session';

import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/core';

const ThingNewPage = ({ firebase }) => {
  const authUser = useContext(AuthUserContext);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState();

  const onCreateThing = event => {
    event.preventDefault();
    let outcome;

    firebase
      .things()
      .add({
        title: title,
        userId: authUser.uid,
        createdAt: firebase.fieldValue.serverTimestamp(),
      })
      .then(res => {
        console.log(`${res.id} created`);
        setLocation(<Redirect to={`/thing/${res.id}`} />);
      });

    setTitle('');
    return outcome;
  };

  const onChangeTitle = event => {
    setTitle(event.target.value);
  };

  if (location) {
    // Redirect to new location on creation
    return location;
  }

  return (
    <Box m="50px auto" maxWidth="950px">
      <Heading>New Thing Page</Heading>
      <form onSubmit={onCreateThing}>
        <FormControl>
          <FormLabel htmlFor="thing">What's the thing?</FormLabel>
          <Input
            type="text"
            id="thing"
            aria-describedby="helper-text"
            value={title}
            onChange={onChangeTitle}
          />
          <FormHelperText id="helper-text">
            Form text input helper
          </FormHelperText>
        </FormControl>

        <Button variantColor="green" type="submit" mt={5}>
          Create
        </Button>
      </form>
    </Box>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(ThingNewPage);
