import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {switchToPage} from './components/FrontPage/FrontPageReducer'
import {allShops, signup} from './components/SignUpPage/signUpReducer'
import {login} from './components/LogInPage/logInReducer'

export default combineReducers({
  allShops,
  switchToPage,
  signup,
  login,
  routing: routerReducer
})
