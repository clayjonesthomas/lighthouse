import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducer'
import Container from './Container'
import WelcomePage from './components/WelcomePage/WelcomePage'
import AdminPage from './components/admin/AdminPage/AdminPage'
import TrackedShopPage from './components/admin/TrackedShopPage/TrackedShopPage'
import NewShopPage from './components/admin/NewShopPage/NewShopPage'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {NEW_PASSWORD_PAGE} from './components/NewPassword/NewPasswordPage'
import {NEW_PASSWORD_SUCCESS_PAGE} from './components/NewPassword/NewPasswordSuccessPage'
import {FORGOT_PASSWORD_PAGE} from './components/ForgotPassword/ForgotPasswordPage'
import {FORGOT_PASSWORD_SUCCESS_PAGE} from './components/ForgotPassword/ForgotPasswordSuccessPage'
import {VERIFICATION_SUCCESS_PAGE} from './components/VerificationSuccessPage/VerificationSuccessPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'
import {HOW_IT_WORKS_PAGE} from './components/HowItWorksPage/HowItWorksPage'


import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, NEW_PASSWORD_SUCCESS_URL,
  FORGOT_PASSWORD_URL, FORGOT_PASSWORD_SUCCESS_URL, WELCOME_PAGE_URL,
  SETTINGS_PAGE_URL, VERIFIED_PAGE_URL, HOW_IT_WORKS_PAGE_URL, ADMIN_PAGE_URL,
  TRACKED_SHOPS_URL, NEW_SHOP_URL} from './urls'

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
        <Route path={FORGOT_PASSWORD_URL} component={ForgotPasswordPage}/>
        <Route path={FORGOT_PASSWORD_SUCCESS_URL} component={ForgotPasswordSuccessPage}/>
        <Route path={VERIFIED_PAGE_URL} component={VerificationSuccessPage}/>
        <Route path={SETTINGS_PAGE_URL} component={SettingsPage}/>
        <Route path={WELCOME_PAGE_URL} component={WelcomePage}/>
        <Route path={HOW_IT_WORKS_PAGE_URL} component={ContainerAtHowItWorksPage}/>
        <Route path={ADMIN_PAGE_URL} component={AdminPage}/>
        <Route path={TRACKED_SHOPS_URL} component={TrackedShopPage}/>
        <Route path={NEW_SHOP_URL} component={NewShopPage}/>
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

const VerificationSuccessPage = (props) => {
  return (
    <Container
      page={VERIFICATION_SUCCESS_PAGE}
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

const SettingsPage = (props) => {
  return (
    <Container
      page={SETTINGS_PAGE}
      {...props}
    />
  )
}

const ContainerAtHowItWorksPage = (props) => {
  return (
    <Container
      page={HOW_IT_WORKS_PAGE}
      {...props}
    />
  )
}

const ForgotPasswordPage = (props) => {
  return (
    <Container
      page={FORGOT_PASSWORD_PAGE}
      {...props}
    />
  )
}

const ForgotPasswordSuccessPage = (props) => {
  return (
    <Container
      page={FORGOT_PASSWORD_SUCCESS_PAGE}
      {...props}
    />
  )
}

export default Root
