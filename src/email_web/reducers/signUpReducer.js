import {SIGNUP_EMAIL_CHANGE, SIGNUP_PASSWORD_CHANGE,
  PICKED_SHOPS_CHANGE, SIGN_UP_REQUEST, SIGN_UP_RESPONSE,
  SIGN_UP_RESPONSE_FAILED, ATTEMPT_SIGN_UP} from '../components/SignUpPage/SignUpPageActions'

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
  hasAttemptedSubmission: false,
  invalidEmailFromServer: ''
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
    case ATTEMPT_SIGN_UP:
      return Object.assign({}, state, {
        hasAttemptedSubmission: true
      })
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        submitSpinner: false,
        hasAttemptedSubmission: false
      })
    case SIGN_UP_RESPONSE_FAILED:
      return Object.assign({}, state, {
        submitSpinner: false,
        invalidEmailFromServer: action.data
      })
    default:
      return state
  }
}
