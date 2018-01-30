import {LOG_IN_EMAIL_CHANGE, LOG_IN_PASSWORD_CHANGE,
  LOG_IN_REQUEST, LOG_IN_RESPONSE, LOG_IN_RESPONSE_FAILED,
  ATTEMPT_LOG_IN} from './LogInPageActions'

import {UNVERIFIED_ERROR, PASSWORD_RESET_ERROR,
  AUTHENTICATION_ERROR, SEND_FORGOT_PASSWORD_EMAIL}
  from './LogInPageActions'

import {LOCATION_CHANGE} from 'react-router-redux'

const defaultLogInState = {
  email: '',
  password: '',
  submitSpinner: false,
  hasAttemptedSubmission: false,
  invalidEmailPass: false
}

export function login(state = defaultLogInState, action) {
  switch (action.type) {
    case LOG_IN_EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.data
      })
    case LOG_IN_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        password: action.data
      })
    case ATTEMPT_LOG_IN:
      return Object.assign({}, state, {
        hasAttemptedSubmission: true
      })
    case LOG_IN_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true
      })
    case LOG_IN_RESPONSE:
      return Object.assign({}, state, {
        submitSpinner: false,
        hasAttemptedSubmission: false
      })
    case LOG_IN_RESPONSE_FAILED:
      if (action.data === PASSWORD_RESET_ERROR) {
        return Object.assign({}, state, {
          submitSpinner: false
        })
        // TODO to be completed in the password reset pr
      }
      if (action.data === AUTHENTICATION_ERROR) {
        return Object.assign({}, state, {
          submitSpinner: false,
          invalidEmailPass: true
        })
      }
      return state
    case LOCATION_CHANGE:
      return defaultLogInState
    case SEND_FORGOT_PASSWORD_EMAIL:

    default:
      return state
  }
}
