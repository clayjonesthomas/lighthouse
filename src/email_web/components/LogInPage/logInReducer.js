import {LOG_IN_EMAIL_CHANGE, LOG_IN_PASSWORD_CHANGE,
  LOG_IN_REQUEST, LOG_IN_RESPONSE, LOG_IN_RESPONSE_FAILED,
  ATTEMPT_LOG_IN, TRIGGER_LOGIN_SPINNER_TIMEOUT} from './LogInPageActions'

import {AUTHENTICATION_ERROR}
  from './LogInPageActions'

import {LOCATION_CHANGE} from 'react-router-redux'

const defaultLogInState = {
  email: '',
  password: '',
  submitSpinner: false,
  hasAttemptedSubmission: false,
  invalidEmailPass: false,
  requestInProgress: false
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
        submitSpinner: false,
        requestInProgress: true
      })
    case LOG_IN_RESPONSE:
      return Object.assign({}, state, {
        submitSpinner: false,
        hasAttemptedSubmission: false,
        requestInProgress: false
      })
    case LOG_IN_RESPONSE_FAILED:
      if (action.data === AUTHENTICATION_ERROR) {
        return Object.assign({}, state, {
          submitSpinner: false,
          invalidEmailPass: true,
          requestInProgress: false
        })
      }
      return state
    case TRIGGER_LOGIN_SPINNER_TIMEOUT:
      return Object.assign({}, state, {
        submitSpinner: state.requestInProgress
      })
    case LOCATION_CHANGE:
      return defaultLogInState
    default:
      return state
  }
}
