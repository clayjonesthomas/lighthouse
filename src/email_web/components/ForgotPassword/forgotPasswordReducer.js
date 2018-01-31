import {FORGOT_PASSWORD_EMAIL_CHANGE, ATTEMPT_SUBMIT_FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESPONSE}
  from './ForgotPasswordActions'

const defaultForgotPasswordState = {
  email: '',
  submittedEmail: '',
  submitSpinner: false,
  hasAttemptedSubmission: false
}

export function forgotPassword(state = defaultForgotPasswordState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.data
      })
    case ATTEMPT_SUBMIT_FORGOT_PASSWORD:
      return Object.assign({}, state, {
        hasAttemptedSubmission: true
      })
    case FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true
      })
    case FORGOT_PASSWORD_RESPONSE:
      return Object.assign({}, defaultForgotPasswordState, {
        submittedEmail: action.data
      })
    default:
      return state
  }
}
