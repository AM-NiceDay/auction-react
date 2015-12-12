import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import Index from './components/Index';

ReactDOM.render(
  <Router>
    <Route component={App}>
      <Route path="/" component={Index} />
    </Route>
  </Router>,
  document.getElementById('app')
);