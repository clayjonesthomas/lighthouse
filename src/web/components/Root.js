import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux'
import FrontPageHandler from '../containers/FrontPageHandler'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import lighthouse from '../reducers/reducer.js'
import NewPostHandler from '../containers/NewPostHandler';
import thunkMiddleware from 'redux-thunk'
import ModalHandler from '../containers/ModalHandler.js'



let store = createStore(
  lighthouse,
  applyMiddleware(
    thunkMiddleware
  )
)

const Root = () => (
  <Provider store={store}>
    <ModalHandler/>
    <Router history={browserHistory}>
      <Route path="/" component={FrontPageHandler} />
      <Route path="/new" component={NewPostHandler} />
    </Router>
  </Provider>
);

export default Root;