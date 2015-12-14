import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import Index from './components/Index';
import Room from './components/Room';
import reducers from './reducers';
import io from 'socket.io-client';
import remoteActionMiddleware from './middlewares/remoteActionMiddleware';
import { updateRoom } from './actions/room';

var socket = io('http://localhost:8000/');

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducers);

socket.on('UPDATE_ROOM', room => {
  store.dispatch(updateRoom(room));
});

console.log(store.getState().toJS());
store.subscribe(() => {
  console.log(store.getState().toJS());
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App}>
        <Route path="/" component={Index} />
        <Route path="room" component={Room} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);