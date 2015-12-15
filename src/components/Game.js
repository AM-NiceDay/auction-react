import React from 'react';
import { connect } from 'react-redux';

const Game = React.createClass({

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
        {this.getPlayers().map(player => <li key={player}>{player}</li>)}
      </ul>
    </div>
  }
});

export default connect(state => ({
  game: state.get('game'),
  user: state.get('user')
}))(Game);
