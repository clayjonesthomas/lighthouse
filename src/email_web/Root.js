import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers/index'
import Container from './Container'

import {LANDING_PAGE, SIGN_UP_PAGE} from './components/FrontPage/FrontPage'


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
        <Route path="/Login" component={ContainerAtLogInPage}/>
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
