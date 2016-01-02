import React from 'react';
import { connect } from 'react-redux';
import { createRoom, joinRoom } from '../actions/room';
import { createUser } from '../actions/user';
import LoginForm from './LoginForm';

const Index = React.createClass({

  createRoomHandler() {
    const { dispatch, user, socket } = this.props;

    dispatch(createRoom(user));

    socket.on('ROOM_CREATED', roomId => {
      this.props.history.pushState(null, `/room/${roomId}`);
    });
  },

  joinRoomHandler() {
    const { dispatch, user } = this.props;

    dispatch(joinRoom(user));
    this.props.history.pushState(null, '/room');
  },

  loginHandler(name) {
    const { dispatch } = this.props;

    dispatch(createUser(name));
  },

  render() {
    const isLoggedIn = !this.props.user.isEmpty();

    return <div>
      { isLoggedIn ? <div>
          <button onClick={ this.createRoomHandler }>Create room</button>
          <button onClick={ this.joinRoomHandler }>Join room</button>
        </div> : <LoginForm login={ this.loginHandler }/>
      }
    </div>
  }
});

export default connect(state => ({
  user: state.get('user')
}))(Index);
