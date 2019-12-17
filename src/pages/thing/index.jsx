import React, { useEffect, useState } from 'react';
import { withFirebase } from 'components/base/Firebase';

import { Heading, Box, Text } from '@chakra-ui/core';

const ThingPage = ({ location, firebase }) => {
  const thingId = location.pathname.replace('/thing/', '');

  const [thing, setThing] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const thingy = firebase.thing(thingId);
    thingy
      .get()
      .then(function(doc) {
        if (doc.exists) {
          const data = doc.data();
          console.log('Document data:', data);
          setLoading(false);
          setThing(data);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  }, [firebase, thingId]);

  if (loading) {
    return (
      <Box m="50px auto" maxWidth="950px">
        <Box>Loading!</Box>
      </Box>
    );
  }

  const { title, userId } = thing;

  return (
    <Box m="50px auto" maxWidth="950px">
      <Heading>{title}</Heading>
      <Text>user id: {userId}</Text>
    </Box>
  );
};

export default withFirebase(ThingPage);
