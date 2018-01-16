import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducer'
import Container from './Container'

import {LANDING_PAGE} from './LandingPage/LandingPageHandler'
import {SIGN_UP_PAGE} from './SignUpPage/SignUpPageHandler'

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
      <Route path="/">
        <IndexRoute component={LandingPage_}/>
        <Route path="/signup" component={SignUpPage_}/>
      </Route>
    </Router>
  </Provider>
)

const LandingPage_ = (props) => {
  return (
    <Container
      page={LANDING_PAGE}
      {...props}
    />
  )
}

const SignUpPage_ = (props) => {
  return (
    <Container
      page={SIGN_UP_PAGE}
      {...props}
    />
  )
}

export default Root