import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {switchToPage} from './components/FrontPage/FrontPageReducer'
import {allShops, signup} from './components/SignUpPage/signUpReducer'
import {login} from './components/LogInPage/logInReducer'
import {user} from './services/userReducer'

export default combineReducers({
  allShops,
  switchToPage,
  signup,
  login,
  user,
  routing: routerReducer
})
