import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer'
import FrontPage from './LandingPage'
import App from './App'

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory)
  )
)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={FrontPage}/>
      </Route>
    </Router>
  </Provider>
)

export default Root