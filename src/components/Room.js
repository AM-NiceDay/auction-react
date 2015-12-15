import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getRoom } from '../actions/room';
import { startGame } from '../actions/game';

const Room = React.createClass({

  componentWillMount() {
    this.props.dispatch(getRoom());
  },

  handleGameStart() {
    const { dispatch } = this.props;

    dispatch(startGame(this.props.room));
    this.props.history.pushState(null, '/game');
  },

  getOwner() {
    return this.props.room.get('owner');
  },

  getPlayers() {
    return this.props.room.get('players');
  },

  isOwner() {
    return this.props.room.get('owner') == this.props.user;
  },

  render() {
    return <div>
      <p>Owner: {this.getOwner()}</p>
      <p>Players:</p>
      <ul>
        {this.getPlayers().map(player => <li key={player}>{player}</li>)}
      </ul>

      {this.isOwner()
        ? <button onClick={ this.handleGameStart() }>Start game</button> : null}
    </div>
  }
});

export default connect(state => ({
  room: state.get('room'),
  user: state.get('user')
}))(Room);
