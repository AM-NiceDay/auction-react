import React from 'react';
import { connect } from 'react-redux';
import { getGame, updateGame, removeGame, gameRemoved, nextTick, buyThing, buyJoker } from '../actions/game';
import PlayersStats from './PlayersStats';

const Game = React.createClass({

  componentWillMount() {
    const { dispatch, socket, params, history } = this.props;

    dispatch(getGame(params.gameId));
    socket.on('UPDATE_GAME', (game) => {
      if (game._id == params.gameId) {
        dispatch(updateGame(game));
      }
    });
    socket.on('GAME_REMOVED', gameId => {
      if (gameId == params.gameId) {
        dispatch(gameRemoved());
        history.pushState(null, `/`);
      }
    });
    socket.on('UPDATE_CURRENT_WINNER', winner => {
      dispatch({
        type: 'UPDATE_CURRENT_WINNER',
        winner
      });
    })
  },

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeAllListeners('UPDATE_GAME');
    socket.removeAllListeners('GAME_REMOVED');
    socket.removeAllListeners('UPDATE_CURRENT_WINNER');
  },

  nextTickHandler() {
    this.props.dispatch(nextTick(this.props.game.get('_id')));
  },

  buyThingHandler() {
    this.props.dispatch(buyThing(
      this.props.game.get('_id'),
      this.props.user.get('id')
    ));
  },

  endGameHandler() {
    this.props.dispatch(removeGame(this.props.game.get('_id')));
  },

  buyJokerHandler() {
    var joker = Number(this.refs.joker.value);
    this.props.dispatch(buyJoker(
      joker,
      this.props.game.get('_id'),
      this.props.user.get('id')
    ));
  },

  getWinner() {
    this.props.dispatch({
      type: 'GET_CURRENT_WINNER',
      gameId: this.props.game.get('id'),
      meta: {
        remote: true
      }
    });
  },

  render() {
    const { game, user } = this.props;
    const owner = game.get('owner');
    const players = game.get('players');
    const things = game.get('things').toJS();
    const playersStats = game.get('playersStats').toJS();
    const playersPoints = game.get('playersPoints').toJS();
    const playerStats = playersStats[user.get('id')];
    const isOwner = owner ? owner.get('_id') === user.get('id') : false;

    return <div>
      <p>Owner: { owner.get('name') }</p>
      { game.get('isOver') ? <div>
        <p>Winner: { game.get('winner').get('name') }</p>
        </div> : <div>
          <p>Things: { things.join(', ') }</p>
          <p>Current thing: { game.get('currentThing') }</p>
          <p>Current price: { game.get('currentPrice') }</p>
          { isOwner ? <div>
              <p>Difference: { game.get('difference') }</p>
              <p>Joker: { game.get('joker') }</p>
              <button onClick={ this.nextTickHandler }>Next tick</button>
              <button onClick={ this.getWinner }>Get current winner</button>
            </div> :
            <div>
              { playerStats ? <div>
                  <p>Things: { playerStats.things.join(', ') }</p>
                  <p>Money: { playerStats.money }</p>
                </div> : null
              }
              <input type="text" ref="joker" />
              <button onClick={ this.buyJokerHandler }>Buy Joker</button>
              <button onClick={ this.buyThingHandler }>Buy thing</button>
            </div>
          }
        </div>
      }

      { isOwner ? <PlayersStats players={ players } playersStats={ playersStats } playersPoints={ playersPoints } /> : <div>
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
