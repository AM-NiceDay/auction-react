import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getRoom } from '../actions/room';

const Room = React.createClass({

  componentWillMount() {
    this.props.dispatch(getRoom());
  },

  getOwner() {
    return this.props.room.get('owner');
  },

  getPlayers() {
    return this.props.room.get('players');
  },

  render() {
    return <div>
      <p>Owner: {this.getOwner()}</p>
      <p>Players:</p>
      <ul>
        {this.getPlayers().map(player => <li key={player}>{player}</li>)}
      </ul>

      {this.props.}
    </div>
  }
});

export default connect(state => ({ room: state.get('room') }))(Room);
