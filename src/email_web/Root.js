import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './option_1a/i/reducer'
import FrontPage_1 from './option_1a/i/FrontPage'
import FrontPage_2 from './option_1a/ii/FrontPage'
import FrontPage_3 from './option_1a/iii/FrontPage'
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
        <Route path="option_1" component={FrontPage_1}/>
        <Route path="option_2" component={FrontPage_2}/>
        <Route path="option_3" component={FrontPage_3}/>


      </Route>
    </Router>
  </Provider>
)

export default Root