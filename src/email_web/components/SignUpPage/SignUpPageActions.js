import fetch from 'isomorphic-fetch'
import {SIGN_UP_URL} from '../../urls'

import {validateEmail, validatePassword} from './SignUpPage'

export const SIGNUP_EMAIL_CHANGE = 'SIGNUP_EMAIL_CHANGE'
export const SIGNUP_PASSWORD_CHANGE = 'SIGNUP_PASSWORD_CHANGE'
export const PICKED_SHOPS_CHANGE = 'PICKED_SHOPS_CHANGE'
export const ATTEMPT_SIGN_UP = 'ATTEMPT_SIGN_UP'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_RESPONSE = 'SIGN_UP_RESPONSE'
export const SIGN_UP_RESPONSE_FAILED = 'SIGN_UP_RESPONSE_FAILED'

export const emailChange = (value) => {
  return {
    type: SIGNUP_EMAIL_CHANGE,
    data: value
  }
}

export const passwordChange = (value) => {
  return {
    type: SIGNUP_PASSWORD_CHANGE,
    data: value
  }
}

export const pickedShopsChange = (listOfShops) => {
  return {
    type: PICKED_SHOPS_CHANGE,
    data: listOfShops
  }
}

export const attemptSignUp = () => {
  return {
    type: ATTEMPT_SIGN_UP
  }
}

export const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

export const signUpResponse = () => {
  return {
    type: SIGN_UP_RESPONSE
  }
}

export const signUpResponseFailed = (invalidEmail) => {
  return {
    type: SIGN_UP_RESPONSE_FAILED,
    data: invalidEmail
  }
}

export function submitSignUpForm() {
  return (dispatch, getState) => {
    const state = getState()
    const email = state.signup.email
    const password = state.signup.password
    const emailValidation = validateEmail(email, true, false)
    const passwordValidation = validatePassword(password, true)

    dispatch(attemptSignUp())
    if (!emailValidation && !passwordValidation) {
      _submitSignUpForm(dispatch, getState)
    }
  }
}

function _submitSignUpForm(dispatch, getState) {
  const state = getState()
  const email = state.signup.email
  const password = state.signup.password
  const selectedShops = state.signup.selectedShops

  const args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      email: email,
      password: password,
      selectedShops: selectedShops
    })
  }
  dispatch(signUpRequest())
  return fetch(SIGN_UP_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email)
        dispatch(signUpResponse(json))
      else
        dispatch(signUpResponseFailed(json.invalidEmail))
    })
}
