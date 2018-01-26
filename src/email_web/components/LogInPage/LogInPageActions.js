import fetch from 'isomorphic-fetch'
import {LOG_IN_URL} from '../../urls'
import {validateEmail, validatePassword} from './LogInPageComponent'

export const LOG_IN_EMAIL_CHANGE = 'LOG_IN_EMAIL_CHANGE'
export const LOG_IN_PASSWORD_CHANGE = 'LOG_IN_PASSWORD_CHANGE'
export const ATTEMPT_LOG_IN = 'ATTEMPT_LOG_IN'
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_RESPONSE = 'LOG_IN_RESPONSE'
export const LOG_IN_RESPONSE_FAILED = 'LOG_IN_RESPONSE_FAILED'

export const emailChange = (value) => {
  return {
    type: LOG_IN_EMAIL_CHANGE,
    data: value
  }
}

export const passwordChange = (value) => {
  return {
    type: LOG_IN_PASSWORD_CHANGE,
    data: value
  }
}


export const attemptLogIn = () => {
  return {
    type: ATTEMPT_LOG_IN
  }
}

export const logInRequest = () => {
  return {
    type: LOG_IN_REQUEST
  }
}

export const logInResponse = () => {
  return {
    type: LOG_IN_RESPONSE
  }
}

export const logInResponseFailed = () => {
  return {
    type: LOG_IN_RESPONSE_FAILED
  }
}


export function submitLogInForm() {
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
  dispatch(logInRequest())
  return fetch(LOG_IN_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email)
        dispatch(logInResponse(json))
      else
        dispatch(logInResponseFailed())
    })
}
