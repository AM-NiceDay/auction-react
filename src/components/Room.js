import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getRoom, updateRoom } from '../actions/room';
import { startGame, joinGame } from '../actions/game';

const Room = React.createClass({

  componentWillMount() {
    const { dispatch, socket } = this.props;

    dispatch(getRoom());

    socket.on('UPDATE_ROOM', room => {
      dispatch(updateRoom(room));
    });

    socket.on('GAME_STARTED', game => {
      dispatch(joinGame(game));
      this.props.history.pushState(null, '/game');
    });
  },

  componentWillUnmount() {
    this.props.socket.removeAllListeners('UPDATE_ROOM');
    this.props.socket.removeAllListeners('GAME_STARTED');
  },

  handleGameStart() {
    const { dispatch } = this.props;

    dispatch(startGame(this.props.room.toJS()));
    this.props.history.pushState(null, '/game');
  },

  render() {
    const { room, user } = this.props;
    const owner = room.get('owner');
    const players = room.get('players');
    const isOwner = room.get('owner').get('id') === user.get('id');

    return <div>
      <p>Owner: { owner.get('name') }</p>
      <p>Players:</p>
      <ul>
        { players.map(player => <li key={player.get('id')}>{ player.get('name') } </li>) }
      </ul>

      { isOwner ? <button onClick={ this.handleGameStart }>Start game</button> : null }
    </div>
  }
});

export default connect(state => ({
  room: state.get('room'),
  user: state.get('user')
}))(Room);
