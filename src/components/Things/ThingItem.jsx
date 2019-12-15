import React from 'react';
import { Link } from 'react-router-dom';

const ThingItem = ({ authUser, thing, onRemoveThing }) => {
  return (
    <>
      <Link to={`/thing/${thing.uid}`}>
        <strong>{thing.name}</strong>
      </Link>

      <p>
        <span>ID: {thing.uid}</span>
        <br />
        <span>User ID: {thing.userId}</span>
      </p>
    </>
  );
};

export default ThingItem;
