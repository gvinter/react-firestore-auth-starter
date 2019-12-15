import React from 'react';
import { Link } from 'react-router-dom';

const ThingItem = () => {
  const { authUser, thing, onRemoveThing } = this.props;
  const { editMode, editText } = this.state;

  return (
    <Link to={`/thing/${thing.uid}`}>
      <span>
        <strong>{thing.userId}</strong> {thing.name}
        {thing.editedAt && <span>(Edited)</span>}
      </span>
    </Link>
  );
};

export default ThingItem;
