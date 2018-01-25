import {GO_TO_SIGN_UP} from '../services/NewUserActions'

import {SIGN_UP_PAGE} from '../components/SignUpPage/SignUpPage'

import {LOCATION_CHANGE} from 'react-router-redux'

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
