import React from 'react';

export default React.createClass({
  render() {
    return <div>
      <h4>Auction</h4>
      {this.props.children}
    </div>
  }
});
