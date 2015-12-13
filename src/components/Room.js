import React from 'react';
import { connect } from 'react-redux'

const Room = React.createClass({

  getOwner() {
    return this.props.room.owner || 'unknown';
  },

  render() {
    return <div>
      <p>Owner: {this.getOwner()}</p>
    </div>
  }
});

export default connect(state => ({ room: state.room }))(Room);
