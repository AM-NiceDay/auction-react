import React from 'react';
import { connect } from 'react-redux'

const Room = React.createClass({

  getOwner() {
    return this.props.room.owner || 'unknown';
  },

  getPlayers() {
    return this.props.room.players || [];
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

export default connect(state => ({ room: state.room }))(Room);
