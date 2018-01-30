import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

import {LANDING_PAGE_URL, FORGOT_PASSWORD_URL}
  from '../../urls'

export const LOG_IN_PASSWORD_CHANGE = 'LOG_IN_PASSWORD_CHANGE'
export const ATTEMPT_LOG_IN = 'ATTEMPT_LOG_IN'
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_RESPONSE = 'LOG_IN_RESPONSE'
export const LOG_IN_RESPONSE_FAILED = 'LOG_IN_RESPONSE_FAILED'

export const UNVERIFIED_ERROR = 'UNVERIFIED_ERROR'
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const SEND_FORGOT_PASSWORD_EMAIL = 'SEND_FORGOT_PASSWORD_EMAIL'

export const passwordChange = (value) => {
  return {
    type: NEW_PASS_PASSWORD_CHANGE,
    data: value
  }
}

export const confirmPasswordChange = (value) => {
  return {
    type: NEW_PASS_CONFIRM_PASSWORD_CHANGE,
    data: value
  }
}

export const attemptSubmitNewPass = () => {
  return {
    type: ATTEMPT_SUBMIT_NEW_PASS
  }
}

export const submitNewPassRequest = () => {
  return {
    type: SUBMIT_NEW_PASS_REQUEST
  }
}

export const submitNewPassResponse = (json) => {
  return {
    type: SUBMIT_NEW_PASS_RESPONSE,
    data: {
      email: json.email,
      isVerified: json.isVerified,
      isModerator: json.isModerator
    }
  }
}

export const submitNewPassResponseFailed = (error) => {
  return {
    type: SUBMIT_NEW_PASS_RESPONSE_FAILED,
    data: error
  }
}


export function submitNewPass() {
  return (dispatch, getState) => {
    const state = getState()
    const email = state.login.email
    const emailValidation = validateEmail(email, true, false)

    dispatch(attemptLogIn())
    if (!emailValidation) {
      _submitLogInForm(dispatch, getState)
    }
  }
}
////////// working on all needed actions, then everything else
function _submitLogInForm(dispatch, getState) {
  const state = getState()
  const email = state.login.email
  const password = state.login.password
  const args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      email: email,
      password: password
    })
  }
  dispatch(submitNewPassRequest())
  return fetch(NEW_PASS_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email) {
        dispatch(submitNewPassResponse(json))
        dispatch(push(LANDING_PAGE_URL))
      }
      else
        dispatch(submitNewPassResponseFailed(json.error))
    })
}
