import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux'
import FrontPageHandler from '../containers/FrontPageHandler'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import lighthouse from '../reducers/reducer.js'
import NewPostHandler from '../containers/NewPostHandler';
import thunkMiddleware from 'redux-thunk'



let store = createStore(
  lighthouse,
  applyMiddleware(
    thunkMiddleware
  )
)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={FrontPageHandler} />
      <Route path="/new" component={NewPostHandler} />
    </Router>
  </Provider>
);

export default Root;