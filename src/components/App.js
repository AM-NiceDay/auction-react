import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../actions/user';

export function createApp(socket) {
  const App =  React.createClass({
    render() {
      const isLoggedIn = !this.props.user.isEmpty();
      const { user, dispatch } = this.props;

      return <div>
        <h4>Auction</h4>
        { isLoggedIn ? <p>
            User: { user.get('name') }
            {' - '}
            <button onClick={ () => dispatch(removeUser()) }>Logout</button>
          </p> : null }
        {React.cloneElement(this.props.children, {socket: socket})}
      </div>
    }
  });

  return connect(state => ({
    user: state.get('user')
  }))(App);
}
