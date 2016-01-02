import React from 'react';
import { connect } from 'react-redux';
import { createRoom, joinRoom } from '../actions/room';
import { getRooms, updateRooms } from '../actions/rooms';
import { createUser } from '../actions/user';
import LoginForm from './LoginForm';

const Index = React.createClass({

  componentWillMount() {
    const { dispatch, socket } = this.props;

    dispatch(getRooms());

    socket.on('UPDATE_ROOMS', rooms => {
      dispatch(updateRooms(rooms));
    });
  },

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeAllListeners('ROOM_CREATED');
    socket.removeAllListeners('ROOM_JOINED');
    socket.removeAllListeners('UPDATE_ROOMS');
  },

  createRoomHandler() {
    const { dispatch, user, socket } = this.props;

    dispatch(createRoom(user));

    socket.on('ROOM_CREATED', roomId => {
      this.props.history.pushState(null, `/room/${roomId}`);
    });
  },

  joinRoomHandler(roomId) {
    const { dispatch, user, socket } = this.props;

    dispatch(joinRoom(roomId, user));

    socket.on('ROOM_JOINED', () => {
      this.props.history.pushState(null, `/room/${roomId}`);
    });
  },

  loginHandler(name) {
    const { dispatch } = this.props;

    dispatch(createUser(name));
  },

  render() {
    const isLoggedIn = !this.props.user.isEmpty();
    const { rooms } = this.props;

    return <div>
      { isLoggedIn ? <div>
          <button onClick={ this.createRoomHandler }>Create room</button>
          <ul>
            { rooms.toJS().map(room => <li key={ room._id }>
              Room: { room._id }, Owner: { room.owner.name }
              <button onClick={ () => this.joinRoomHandler(room._id) }>Join room</button>
            </li>) }
          </ul>
        </div> : <LoginForm login={ this.loginHandler }/>
      }
    </div>
  }
});

export default connect(state => ({
  user: state.get('user'),
  rooms: state.get('rooms')
}))(Index);
