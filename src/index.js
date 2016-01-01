import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createApp } from './components/App';
import Index from './components/Index';
import Room from './components/Room';
import Game from './components/Game';
import reducers from './reducers';
import io from 'socket.io-client';
import remoteActionMiddleware from './middlewares/remoteActionMiddleware';
import createLogger from 'redux-logger';
import { updateUser } from './actions/user';
import { updateRoom } from './actions/room';

var socket = io('http://localhost:8000/');

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
  createLogger({
    stateTransformer(state) {
      return state.toJS();
    }
  })
)(createStore);
const store = createStoreWithMiddleware(reducers);

socket.on('UPDATE_USER', user => {
  store.dispatch(updateUser(user));
});

socket.on('UPDATE_ROOM', room => {
  store.dispatch(updateRoom(room));
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={createApp(socket)}>
        <Route path="/" component={Index} />
        <Route path="room" component={Room} />
        <Route path="game" component={Game} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);