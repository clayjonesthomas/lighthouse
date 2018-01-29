import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducer'
import Container from './Container'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'



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
        <Route path="/login" component={ContainerAtLogInPage}/>
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

const ContainerAtLogInPage = (props) => {
  return (
    <Container
      page={LOG_IN_PAGE}
      {...props}
    />
  )
}


export default Root
