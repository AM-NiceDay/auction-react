import React from 'react';
import { connect } from 'react-redux';
import { getGame, updateGame, removeGame, gameRemoved } from '../actions/game';

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

  endGameHandler() {
    const { dispatch } = this.props;

    dispatch(removeGame());
  },

  render() {
    const { game, user } = this.props;
    const owner = game.get('owner');
    const players = game.get('players');
    const playersStats = game.get('playersStats').toJS();
    const things = game.get('things').toJS();

    const isOwner = owner ? owner.get('_id') === user.get('id') : false;

    return <div>
      <p>Owner: { owner.get('name') }</p>
      <p>Things: { isOwner ? things.join(', ') : null }</p>
      <p>Current thing: { game.get('currentThing') }</p>
      <p>Current price: { game.get('currentPrice') }</p>
      <p>Players:</p>
      { isOwner ?
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Money</td>
              <td>Things</td>
            </tr>
          </thead>
          <tbody>
            { players.toJS().map(player => <tr key={player._id}>
                <td>{ playersStats[player._id].name }</td>
                <td>{ playersStats[player._id].money }</td>
                <td>{ playersStats[player._id].things.join(', ') }</td>
              </tr>)
            }
          </tbody>
        </table> :
        <ul>
          { players.toJS().map(player => <li key={ player._id }>{ player.name }</li>) }
        </ul>
      }
      { isOwner ? <button onClick={ this.endGameHandler }>End game</button> : null }
    </div>
  }
});

export default connect(state => ({
  game: state.get('game'),
  user: state.get('user')
}))(Game);
