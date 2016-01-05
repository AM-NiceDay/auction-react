import React from 'react';
import { connect } from 'react-redux';
import { getGame, updateGame, removeGame, gameRemoved, nextTick, buyThing } from '../actions/game';
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
    this.props.dispatch(removeGame());
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
          { isOwner ?
            <button onClick={ this.nextTickHandler }>Next tick</button> :
            <div>
              { playerStats ? <div>
                  <p>Things: { playerStats.things.join(', ') }</p>
                  <p>Money: { playerStats.money }</p>
                </div> : null
              }
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
