import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {switchToPage} from './components/FrontPage/frontPageReducer'
import {allShops, signup} from './components/SignUpPage/signUpReducer'
import {login} from './components/LogInPage/logInReducer'
import {user} from './services/userReducer'
import {newPass} from './components/NewPassword/newPasswordReducer'
import {forgotPassword} from './components/ForgotPassword/forgotPasswordReducer'
import {settings} from './components/SettingsPage/settingsReducer'
import {admin} from './components/admin/AdminPage/adminReducer'

export default combineReducers({
  allShops,
  switchToPage,
  signup,
  login,
  user,
  newPass,
  forgotPassword,
  settings,
  admin,
  routing: routerReducer
})
