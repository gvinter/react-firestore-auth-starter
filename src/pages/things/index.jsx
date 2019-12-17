import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from 'components/base/Session';
import { withFirebase } from 'components/base/Firebase';

import Things from 'components/Things';

import { Heading, Button, Box } from '@chakra-ui/core';

const ThingsPage = ({ firebase }) => {
  const [things, setThings] = useState(null);
  const [loading, setLoading] = useState(false);
  const authUser = useContext(AuthUserContext);

  useEffect(() => {
    setLoading(true);

    firebase
      .things()
      // .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(snapshot => {
        console.log(snapshot.size);
        if (snapshot.size) {
          let thingItems = [];
          snapshot.forEach(doc => {
            // console.log(doc.data());
            return thingItems.push({ ...doc.data(), uid: doc.id });
          });

          setThings(thingItems.reverse());
          setLoading(false);
        } else {
          setThings([]);
          setLoading(false);
        }
      });
  }, [firebase]);

  console.log(things);

  return (
    <Box m="50px auto" maxWidth="950px">
      <Heading>Things Page</Heading>
      <Link to="/things/new">
        <Button>New Thing</Button>
      </Link>
      <Box my={5}>
        <p>The Things Page is accessible by every signed in user.</p>
      </Box>
      {loading && <Box my={5}>'Loading!'</Box>}
      <Box my={5}>
        <Things authUser={authUser} things={things} />
      </Box>
    </Box>
  );
};

export default withFirebase(ThingsPage);
