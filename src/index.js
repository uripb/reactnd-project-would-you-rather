import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import App from 'containers/app';
import reducer from './reducers';
import middleware from './middleware';
import './scss/app.scss';

const store = createStore(reducer, middleware);
const appRoot = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  appRoot,
);
