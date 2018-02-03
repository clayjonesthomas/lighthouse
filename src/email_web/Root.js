import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducer'
import Container from './Container'
import WelcomePage from './components/WelcomePage/WelcomePage'


import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {VERIFICATION_SUCCESS_PAGE} from './components/VerificationSuccessPage/VerificationSuccessPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'


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
        <Route path="/verified" component={ContainerAtVerificationSuccessPage}/>
        <Route path="/settings" component={ContainerAtSettingsPage}/>
        <Route path="/welcome" component={WelcomePage}/>
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

const ContainerAtVerificationSuccessPage = (props) => {
  return (
    <Container
      page={VERIFICATION_SUCCESS_PAGE}
      {...props}
    />
  )
}
    
const ContainerAtSettingsPage = (props) => {
  return (
    <Container
      page={SETTINGS_PAGE}
      {...props}
    />
  )
}


export default Root
