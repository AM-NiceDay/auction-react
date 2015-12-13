import React from 'react';
import { connect } from 'react-redux';
import { createRoom } from '../actions/room';

const Index = React.createClass({

  createRoomHandler() {
    const { dispatch } = this.props;

    dispatch(createRoom('Aliaksei'));
    this.props.history.pushState(null, '/room');
  },

  render() {
    return <div>
      <button onClick={this.createRoomHandler}>Create room</button>
      <button>Join room</button>
    </div>
  }
});

export default connect()(Index);
