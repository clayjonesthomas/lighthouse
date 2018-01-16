import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducer'
import Container from './Container'

import {LANDING_PAGE} from './LandingPage/LandingPageHandler'
import {SIGN_UP_PAGE} from './SignUpPage/SignUpPageHandler'


const router = routerMiddleware(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    router
  )
)
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={ContainerAtLandingPage}/>
        <Route path="/signup" component={ContainerAtSignUpPage}/>
      </Route>
    </Router>
  </Provider>
)

const ContainerAtLandingPage = (props) => {
  return (
    <Container
      page={LANDING_PAGE}
      {...props}
    />
  )
}

const ContainerAtSignUpPage = (props) => {
  return (
    <Container
      page={SIGN_UP_PAGE}
      {...props}
    />
  )
}

export default Root