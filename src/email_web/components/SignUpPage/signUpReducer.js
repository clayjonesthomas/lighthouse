import {SIGN_UP_EMAIL_CHANGE, SIGN_UP_PASSWORD_CHANGE,
  PICKED_SHOPS_CHANGE, SIGN_UP_REQUEST, SIGN_UP_RESPONSE,
  SIGN_UP_RESPONSE_FAILED, ATTEMPT_SIGN_UP, TRIGGER_SIGNUP_SPINNER_TIMEOUT} 
  from './SignUpPageActions'

import {ALL_SHOPS_RESPONSE}
  from '../../services/ShopDataActions'

import {LOCATION_CHANGE} from 'react-router-redux'

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
  invalidEmailFromServer: '',
  requestInProgress: false
}

export function signup(state = defaultSignUpState, action) {
  switch (action.type) {
    case SIGN_UP_EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.data
      })
    case SIGN_UP_PASSWORD_CHANGE:
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
        submitSpinner: false,
        requestInProgress: true
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        submitSpinner: false,
        hasAttemptedSubmission: false,
        requestInProgress: false
      })
    case SIGN_UP_RESPONSE_FAILED:
      return Object.assign({}, state, {
        submitSpinner: false,
        invalidEmailFromServer: action.data,
        requestInProgress: false
      })
    case TRIGGER_SIGNUP_SPINNER_TIMEOUT:
      return Object.assign({}, state, {
        submitSpinner: state.requestInProgress,
      })
    case LOCATION_CHANGE:
      return defaultSignUpState
    default:
      return state
  }
}
