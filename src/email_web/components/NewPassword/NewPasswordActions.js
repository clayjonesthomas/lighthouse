import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

import {NEW_PASSWORD_SUCCESS_URL, NEW_PASSWORD_URL}
  from '../../urls'

import {validatePassword, validatePasswords}
  from './NewPasswordComponent'

export const NEW_PASS_PASSWORD_CHANGE = 'NEW_PASS_PASSWORD_CHANGE'
export const NEW_PASS_CONFIRM_PASSWORD_CHANGE = 'NEW_PASS_CONFIRM_PASSWORD_CHANGE'
export const ATTEMPT_SUBMIT_NEW_PASS = 'ATTEMPT_SUBMIT_NEW_PASS'
export const SUBMIT_NEW_PASS_REQUEST = 'SUBMIT_NEW_PASS_REQUEST'
export const SUBMIT_NEW_PASS_RESPONSE = 'SUBMIT_NEW_PASS_RESPONSE'
export const SUBMIT_NEW_PASS_RESPONSE_FAILED = 'SUBMIT_NEW_PASS_RESPONSE_FAILED'

export const AUTH_KEY_ERROR = 'AUTH_KEY_ERROR'
export const AUTH_EMAIL_ERROR = 'AUTH_EMAIL_ERROR'

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

export const submitNewPassResponse = () => {
  return {
    type: SUBMIT_NEW_PASS_RESPONSE
  }
}

export const submitNewPassResponseFailed = (error) => {
  return {
    type: SUBMIT_NEW_PASS_RESPONSE_FAILED,
    data: error
  }
}


export function submitNewPass(email, token) {
  return (dispatch, getState) => {
    const state = getState()
    const password = state.newPass.password
    const confirmPassword = state.newPass.confirmPassword
    const passMatchValidation = validatePasswords(password, confirmPassword, true)
    const passLengthValidation = validatePassword(password, true)

    dispatch(attemptSubmitNewPass())
    if (!passMatchValidation && !passLengthValidation) {
      _submitNewPass(dispatch, getState, email, token)
    }
  }
}

function _submitNewPass(dispatch, getState, email, token) {
  const state = getState()
  const password = state.newPass.password
  const args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      email: email,
      signupToken: token,
      password: password
    })
  }
  dispatch(submitNewPassRequest())
  return fetch(NEW_PASSWORD_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        dispatch(submitNewPassResponse())
        dispatch(push(NEW_PASSWORD_SUCCESS_URL))
      }
      else
        dispatch(submitNewPassResponseFailed(json.error))
    })
}
