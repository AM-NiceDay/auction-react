import React from 'react';
import { connect } from 'react-redux';
import { createRoom, joinRoom } from '../actions/room';

const Index = React.createClass({

  createRoomHandler() {
    const { dispatch } = this.props;
    const name = this.refs.name.value;

    dispatch(createRoom(name));
    this.props.history.pushState(null, '/room');
  },

  joinRoomHandler() {
    const { dispatch } = this.props;
    const name = this.refs.name.value;

    dispatch(joinRoom(name));
    this.props.history.pushState(null, '/room');
  },

  render() {
    return <div>
      <input type="text" ref="name" />
      <button onClick={this.createRoomHandler}>Create room</button>
      <button onClick={this.joinRoomHandler}>Join room</button>
    </div>
  }
});

export default connect()(Index);
