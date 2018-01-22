import {GO_TO_SIGN_UP} from '../actions'

import {REQUEST_SHOPS_RETURN} from 'scenes/NewPostPage/NewPostActions'
import {REQUEST_MY_SHOPS_RETURN} from 'scenes/MyShopsPage/MyShopsPageActions'

import {LANDING_PAGE, SIGN_UP_PAGE}
  from '../Container'

import {LOCATION_CHANGE} from 'react-router-redux'

export function displayedShops(state = [], action) {
  switch (action.type) {
    case REQUEST_MY_SHOPS_RETURN:
      return action.data.shops
    default:
      return state
  }
}

export function shops(state = [], action) {
  switch (action.type) {
    case REQUEST_SHOPS_RETURN:
      return action.data.shops
    default:
      return state
  }
}

export function switchToPage(state = null, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return null
    case GO_TO_SIGN_UP:
      return SIGN_UP_PAGE
    default:
      return state
  }
}
<<<<<<< HEAD:src/email_web/reducers/newUserReducer.js
=======

export default combineReducers({
  shops,
  displayedShops,
  switchToPage,
  routing: routerReducer
})
>>>>>>> email-desktop-frontend-implementation:src/email_web/reducer.js
