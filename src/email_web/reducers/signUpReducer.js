import {SIGNUP_EMAIL_CHANGE, SIGNUP_PASSWORD_CHANGE,
  PICKED_SHOPS_CHANGE, SIGN_UP_REQUEST, SIGN_UP_RESPONSE} from '../components/SignUpPage/SignUpPageActions'

import {ALL_SHOPS_RESPONSE}
  from '../services/ShopDataActions'

export function allShops(state = [], action) {
  switch (action.type) {
    case ALL_SHOPS_RESPONSE:
      return action.data
    default:
      return state
  }
}

const defaultSignUpState = {
  email: '',
  password: '',
  selectedShops: [],
  submitSpinner: false,
  hasAttemptedSubmission: false
}

export function signup(state = defaultSignUpState, action) {
  switch (action.type) {
    case SIGNUP_EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.data
      })
    case SIGNUP_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        password: action.data
      })
    case PICKED_SHOPS_CHANGE:
      return Object.assign({}, state, {
        selectedShops: action.data
      })
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true,
        hasAttemptedSubmission: true
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        submitSpinner: false
      })
    default:
      return state
  }
}
