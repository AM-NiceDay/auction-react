import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getRoom, updateRoom } from '../actions/room';
import { startGame } from '../actions/game';

const Room = React.createClass({

  componentWillMount() {
    const { dispatch, socket, params } = this.props;

    dispatch(getRoom(params.roomId));

    socket.on('UPDATE_ROOM', room => {
      dispatch(updateRoom(room));
    });

    socket.on('GAME_STARTED', gameId => {
      this.props.history.pushState(null, `/game/${gameId}`);
    });
  },

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeAllListeners('UPDATE_ROOM');
    socket.removeAllListeners('GAME_STARTED');
  },

  handleGameStart() {
    const { dispatch } = this.props;

    dispatch(startGame(this.props.room.get('_id')));
  },

  render() {
    const { room, user } = this.props;
    const owner = room.get('owner');
    const players = room.get('players');
    const isOwner = owner ? owner.get('_id') === user.get('id') : false;

    return <div>
      <p>Owner: { owner.get('name') }</p>
      <p>Players:</p>
      <ul>
        { players.map(player => <li key={ player.get('_id') }>{ player.get('name') }</li>) }
      </ul>

      { isOwner ? <button onClick={ this.handleGameStart }>Start game</button> : null }
    </div>
  }
});

export default connect(state => ({
  room: state.get('room'),
  user: state.get('user')
}))(Room);
