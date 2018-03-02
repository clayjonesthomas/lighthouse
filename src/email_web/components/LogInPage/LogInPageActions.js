import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

import {LOG_IN_URL, FORGOT_PASSWORD_BACKEND_URL, USER_FEED_PAGE_URL}
  from '../../urls'
import {validateEmail} from './LogInPageComponent'

export const LOG_IN_EMAIL_CHANGE = 'LOG_IN_EMAIL_CHANGE'
export const LOG_IN_PASSWORD_CHANGE = 'LOG_IN_PASSWORD_CHANGE'
export const ATTEMPT_LOG_IN = 'ATTEMPT_LOG_IN'
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_RESPONSE = 'LOG_IN_RESPONSE'
export const LOG_IN_RESPONSE_FAILED = 'LOG_IN_RESPONSE_FAILED'
export const TRIGGER_LOGIN_SPINNER_TIMEOUT = 'TRIGGER_LOGIN_SPINNER_TIMEOUT'

export const UNVERIFIED_ERROR = 'UNVERIFIED_ERROR' //TODO
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR' //TODO
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'

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

export const logInResponse = (json) => {
  return {
    type: LOG_IN_RESPONSE,
    data: {
      email: json.email,
      isVerified: json.isVerified,
      isModerator: json.isModerator,
      myShops: json.myShops,
      myEmailFrequency: json.myEmailFrequency
    }
  }
}

export const logInResponseFailed = (error) => {
  return {
    type: LOG_IN_RESPONSE_FAILED,
    data: error
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
  dispatch(shouldShowLoginSpinnerTimer())
  return fetch(LOG_IN_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email) {
        dispatch(logInResponse(json))
        dispatch(push(USER_FEED_PAGE_URL))
      }
      else
        dispatch(logInResponseFailed(json.error))
    })
}

export function sendForgotPasswordEmail() {
  return (dispatch, getState) => {
    const state = getState()
    const email = state.login.email
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        email: email
      })
    }
    return fetch(FORGOT_PASSWORD_BACKEND_URL, args)
  }
}

export function shouldShowLoginSpinnerTimer() {
   const SPINNER_MIN_DURATION = 1000 //ms
   return dispatch => {
     return setTimeout(function() {
       dispatch(triggerLoginSpinnerTimeout());
     }, SPINNER_MIN_DURATION);
   }
 }
 
 const triggerLoginSpinnerTimeout = () => {
   return {
     type: TRIGGER_LOGIN_SPINNER_TIMEOUT
   }
 }
