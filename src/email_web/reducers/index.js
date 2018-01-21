import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {shops, displayedShops, switchToPage} from './newUserReducer'
import {signup} from './formReducer'


export default combineReducers({
  shops,
  displayedShops,
  switchToPage,
  signup,
  routing: routerReducer
})
