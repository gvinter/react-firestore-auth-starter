import React, { Component } from 'react';

import { AuthUserContext } from 'components/base/Session';
import { withFirebase } from 'components/base/Firebase';
import ThingsList from './ThingsList';

class Things extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      things: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForThings();
  }

  onListenForThings = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .things()
      // .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let things = [];
          snapshot.forEach(doc =>
            things.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            things: things.reverse(),
            loading: false,
          });
        } else {
          this.setState({ things: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onEditThing = (thing, text) => {
    const { uid, ...thingSnapshot } = thing;

    this.props.firebase.thing(thing.uid).update({
      ...thingSnapshot,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveThing = uid => {
    this.props.firebase.thing(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForThings,
    );
  };

  render() {
    const { things, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && things && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {things && (
              <ThingsList
                authUser={authUser}
                things={things}
                onEditThing={this.onEditThing}
                onRemoveThing={this.onRemoveThing}
              />
            )}

            {!things && <div>There are no things ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Things);
