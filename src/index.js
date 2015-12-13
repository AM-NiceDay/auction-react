import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import Index from './components/Index';
import Room from './components/Room';
import reducers from './reducers';

const store = createStore(reducers);

store.subscribe(() => {
  console.log(store.getState());
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