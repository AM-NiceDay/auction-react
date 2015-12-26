import React from 'react';

export function createApp(socket) {
  return React.createClass({
    render() {
      return <div>
        <h4>Auction</h4>
        {React.cloneElement(this.props.children, {socket: socket})}
      </div>
    }
  });
}
