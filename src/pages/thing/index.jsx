import React, { useEffect, useState } from 'react';
import { withFirebase } from 'components/base/Firebase';

const ThingPage = ({ location, firebase }) => {
  const thingId = location.pathname.replace('/thing/', '');

  const [thing, setThing] = useState(null);
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
  }, [firebase]);

  return (
    <div>
      <h1>Thing Page</h1>

      {loading && 'Loading!'}
      {thing && <p>{thing.name}</p>}
    </div>
  );
};

export default withFirebase(ThingPage);
