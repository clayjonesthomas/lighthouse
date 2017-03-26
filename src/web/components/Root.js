import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux'
import FrontPageHandler from '../containers/FrontPageHandler'
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import lighthouse from '../reducers/reducer.js'
import NewPostHandler from '../containers/NewPostHandler';
import thunkMiddleware from 'redux-thunk'
import Container from './Container.js'



let store = createStore(
  lighthouse,
  applyMiddleware(
    thunkMiddleware
  )
)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={FrontPageHandler} />
        <Route path="/new" component={NewPostHandler} />
      </Route>
    </Router>
  </Provider>
);

export default Root;