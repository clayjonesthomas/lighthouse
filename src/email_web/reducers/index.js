import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {switchToPage} from './newUserReducer'
import {allShops, signup} from './signUpReducer'


export default combineReducers({
  allShops,
  switchToPage,
  signup,
  routing: routerReducer
})
