import {GO_TO_SIGN_UP} from './actions'

import {REQUEST_SHOPS_RETURN} from 'scenes/NewPostPage/NewPostActions'
import {REQUEST_MY_SHOPS_RETURN} from 'scenes/MyShopsPage/MyShopsPageActions'

import {LANDING_PAGE} from './LandingPage/LandingPageHandler'
import {SIGN_UP_PAGE} from './SignUpPage/SignUpPageHandler'

let default_state = {
  switchToPage: null,
  shops: [],
  displayedShops: []
}

export default function reducer(state=default_state, action) {
  switch (action.type) {
    case GO_TO_SIGN_UP:
      return Object.assign({}, state, {
        switchToPage: SIGN_UP_PAGE
      })
    case REQUEST_SHOPS_RETURN:
      return Object.assign({}, state, {
        shops: action.data.shops
      })
    case REQUEST_MY_SHOPS_RETURN:
      return Object.assign({}, state, {
        displayedShops: action.data.shops
      })
    default:
      return state
  }
}