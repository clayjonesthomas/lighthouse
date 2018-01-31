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
import {NEW_PASSWORD_PAGE} from './components/NewPassword/NewPasswordPage'
import {NEW_PASSWORD_SUCCESS_PAGE} from './components/NewPassword/NewPasswordSuccessPage'
import {FORGOT_PASSWORD_PAGE} from './components/ForgotPassword/ForgotPasswordPage'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, NEW_PASSWORD_SUCCESS_URL,
  FORGOT_PASSWORD_URL} from './urls'

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
        <IndexRoute component={LandingPage}/>
        <Route path={SIGN_UP_PAGE_URL} component={SignUpPage}/>
        <Route path={LOG_IN_PAGE_URL} component={LogInPage}/>
        <Route path="/new_password/:email/:signupKey" component={NewPasswordPage}/>
        <Route path={NEW_PASSWORD_SUCCESS_URL} component={NewPasswordSuccessPage}/>
        <Route path={FORGOT_PASSWORD_URL} component={NewPasswordSendEmailPage}/>
      </Route>
    </Router>
  </Provider>
)

const LandingPage = (props) => {
  return (
    <Container
      page={LANDING_PAGE}
      {...props}
    />
  )
}

const SignUpPage = (props) => {
  return (
    <Container
      page={SIGN_UP_PAGE}
      {...props}
    />
  )
}

const LogInPage = (props) => {
  return (
    <Container
      page={LOG_IN_PAGE}
      {...props}
    />
  )
}

const NewPasswordPage = (props) => {
  return (
    <Container
      page={NEW_PASSWORD_PAGE}
      {...props}
    />
  )
}

const NewPasswordSuccessPage = (props) => {
  return (
    <Container
      page={NEW_PASSWORD_SUCCESS_PAGE}
      {...props}
    />
  )
}

const NewPasswordSendEmailPage = (props) => {
  return (
    <Container
      page={FORGOT_PASSWORD_PAGE}
      {...props}
    />
  )
}

export default Root
