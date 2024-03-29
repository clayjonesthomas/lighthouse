import {NEW_PASS_PASSWORD_CHANGE,
  NEW_PASS_CONFIRM_PASSWORD_CHANGE, ATTEMPT_SUBMIT_NEW_PASS,
  SUBMIT_NEW_PASS_REQUEST, SUBMIT_NEW_PASS_RESPONSE,
  SUBMIT_NEW_PASS_RESPONSE_FAILED}
  from './NewPasswordActions'

import {AUTH_KEY_ERROR, AUTH_EMAIL_ERROR}
  from './NewPasswordActions'

import {LOCATION_CHANGE} from 'react-router-redux'

const defaultNewPassState = {
  password: '',
  confirmPassword: '',
  submitSpinner: false,
  hasAttemptedSubmission: false,
  invalidPass: false,
  invalidEmail: false,
  invalidToken: false
}

export function newPass(state = defaultNewPassState, action) {
  switch (action.type) {
    case NEW_PASS_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        password: action.data
      })
    case NEW_PASS_CONFIRM_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        confirmPassword: action.data
      })
    case ATTEMPT_SUBMIT_NEW_PASS:
      return Object.assign({}, state, {
        hasAttemptedSubmission: true
      })
    case SUBMIT_NEW_PASS_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true
      })
    case SUBMIT_NEW_PASS_RESPONSE:
      return defaultNewPassState
    case SUBMIT_NEW_PASS_RESPONSE_FAILED:
      if (action.data === AUTH_KEY_ERROR) {
        return Object.assign({}, state, {
          submitSpinner: false,
          invalidPass: true,
          invalidToken: true
        })
      }
      if (action.data === AUTH_EMAIL_ERROR) {
        return Object.assign({}, state, {
          submitSpinner: false,
          invalidEmail: true,
          invalidToken: true
        })
      }
      return state
    case LOCATION_CHANGE:
      return defaultNewPassState
    default:
      return state
  }
}
