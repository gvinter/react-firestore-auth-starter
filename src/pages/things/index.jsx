import React, { useContext, useState, useEffect } from 'react';

import { AuthUserContext } from 'components/base/Session';
import { withFirebase } from 'components/base/Firebase';

import { ThingsList } from 'components/Things';

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
    <div>
      <h1>Things Page</h1>
      <p>The Things Page is accessible by every signed in user.</p>
      {loading && 'Loading!'}
      <ThingsList authUser={authUser} things={things} />
    </div>
  );
};

export default withFirebase(ThingsPage);
