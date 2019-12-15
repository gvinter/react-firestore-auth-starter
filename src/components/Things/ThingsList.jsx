import React from 'react';

import ThingItem from './ThingItem';

const ThingsList = ({ authUser, things }) => {
  return (
    <ul>
      {things &&
        things.map(thing => (
          <ThingItem
            authUser={authUser}
            key={thing.uid}
            thing={thing}
          />
        ))}
    </ul>
  );
};

export default ThingsList;
