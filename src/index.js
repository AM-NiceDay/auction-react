import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createApp } from './components/App';
import Index from './components/Index';
import Room from './components/Room';
import Game from './components/Game';
import reducers from './reducers';
import io from 'socket.io-client';
import remoteActionMiddleware from './middlewares/remoteActionMiddleware';
import persistState from 'redux-localstorage';
import createLogger from 'redux-logger';
import { updateUser } from './actions/user';
import { fromJS, Map } from 'immutable';

var socket = io('http://localhost/');

const finalCreateStore = compose(
  persistState(null, {
    serialize: (subset) => JSON.stringify(subset.toJS()),
    deserialize: (serializedData) => fromJS(JSON.parse(serializedData)),
    merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
  }),
  applyMiddleware(
    remoteActionMiddleware(socket),
    createLogger({
      stateTransformer(state) {
        return state.toJS();
      }
    })
  )
)(createStore);

const store = finalCreateStore(reducers, Map());

socket.on('UPDATE_USER', user => {
  store.dispatch(updateUser(user));
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={createApp(socket)}>
        <Route path="/" component={Index} />
        <Route path="room/:roomId" component={Room} />
        <Route path="game/:gameId" component={Game} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);