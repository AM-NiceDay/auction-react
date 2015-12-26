import React from 'react';
import { connect } from 'react-redux';
import { getGame, updateGame } from '../actions/game';

const Game = React.createClass({

  componentWillMount() {
    const { dispatch, socket } = this.props;

    dispatch(getGame());
    socket.on('UPDATE_GAME', (game) => {
      dispatch(updateGame(game));
    });
  },

  getOwner() {
    return this.props.game.get('owner');
  },

  getPlayers() {
    return this.props.game.get('players');
  },

  isOwner() {
    return this.props.game.get('owner') == this.props.user;
  },

  render() {
    return <div>
      <p>Owner: {this.getOwner()}</p>
      <p>Players:</p>
      <ul>
        {this.getPlayers().map(player => <li key={player.get('name')}>{player.get('name')}</li>)}
      </ul>
    </div>
  }
});

export default connect(state => ({
  game: state.get('game'),
  user: state.get('user')
}))(Game);
