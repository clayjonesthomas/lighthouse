import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

import {FORGOT_PASSWORD_SUCCESS_URL, FORGOT_PASSWORD_BACKEND_URL}
  from '../../urls'
import {validateEmail} from './ForgotPasswordComponent'

export const FORGOT_PASSWORD_EMAIL_CHANGE = 'FORGOT_PASSWORD_EMAIL_CHANGE'
export const ATTEMPT_SUBMIT_FORGOT_PASSWORD = 'ATTEMPT_SUBMIT_FORGOT_PASSWORD'
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_RESPONSE = 'FORGOT_PASSWORD_RESPONSE'

export const emailChange = (value) => {
  return {
    type: FORGOT_PASSWORD_EMAIL_CHANGE,
    data: value
  }
}

export const attemptSubmitForgotPassword = () => {
  return {
    type: ATTEMPT_SUBMIT_FORGOT_PASSWORD
  }
}

export const forgotPasswordRequest = () => {
  return {
    type: FORGOT_PASSWORD_REQUEST
  }
}

export const forgotPasswordResponse = () => {
  return {
    type: FORGOT_PASSWORD_RESPONSE
  }
}

export function submitForgotPassword() {
  return (dispatch, getState) => {
    const state = getState()
    const email = state.forgotPassword.email
    const emailValidation = validateEmail(email, true)

    dispatch(attemptSubmitForgotPassword())
    if (!emailValidation) {
      _submitForgotPassword(dispatch, getState)
    }
  }
}

function _submitForgotPassword(dispatch, getState) {
  const state = getState()
  const email = state.forgotPassword.email
  const args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      email: email
    })
  }
  dispatch(forgotPasswordRequest())
  return fetch(FORGOT_PASSWORD_BACKEND_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email) {
        dispatch(forgotPasswordResponse(json))
        dispatch(push(FORGOT_PASSWORD_SUCCESS_URL))
      }
    })
}
