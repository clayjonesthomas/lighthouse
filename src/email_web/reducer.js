import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {GO_TO_SIGN_UP} from './actions'

import {REQUEST_SHOPS_RETURN} from 'scenes/NewPostPage/NewPostActions'
import {REQUEST_MY_SHOPS_RETURN} from 'scenes/MyShopsPage/MyShopsPageActions'

import {LANDING_PAGE} from './components/LandingPage/LandingPageHandler'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPageHandler'
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

export default combineReducers({
  shops,
  displayedShops,
  switchToPage,
  routing: routerReducer
})