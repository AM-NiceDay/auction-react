import React from 'react';
import { connect } from 'react-redux';
import { getGame, updateGame, removeGame, gameRemoved, nextTick } from '../actions/game';
import PlayersStats from './PlayersStats';

const Game = React.createClass({

  componentWillMount() {
    const { dispatch, socket, params, history } = this.props;

    dispatch(getGame(params.gameId));
    socket.on('UPDATE_GAME', (game) => {
      dispatch(updateGame(game));
    });
    socket.on('GAME_REMOVED', () => {
      dispatch(gameRemoved());
      history.pushState(null, `/`);
    });
  },

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeAllListeners('UPDATE_GAME');
    socket.removeAllListeners('GAME_REMOVED');
  },

  nextPriceHandler() {
    this.props.dispatch(nextTick());
  },

  endGameHandler() {
    this.props.dispatch(removeGame());
  },

  render() {
    const { game, user } = this.props;
    const owner = game.get('owner');
    const players = game.get('players');
    const things = game.get('things').toJS();
    const isOwner = owner ? owner.get('_id') === user.get('id') : false;

    return <div>
      <p>Owner: { owner.get('name') }</p>
      <p>Things: { isOwner ? things.join(', ') : null }</p>
      <p>Current thing: { game.get('currentThing') }</p>
      <p>Current price: { game.get('currentPrice') }</p>
      { isOwner ? <button onClick={ this.nextPriceHandler }>Next tick</button> : null }
      { isOwner ? <PlayersStats players={ players } playersStats={ game.get('playersStats').toJS() } /> : <div>
        <p>Players:</p>
          <ul>
            { players.toJS().map(player => <li key={ player._id }>{ player.name }</li>) }
          </ul>
        </div>
      }
      { isOwner ? <button onClick={ this.endGameHandler }>End game</button> : null }
    </div>
  }
});

export default connect(state => ({
  game: state.get('game'),
  user: state.get('user')
}))(Game);
