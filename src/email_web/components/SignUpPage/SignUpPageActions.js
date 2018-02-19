import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'
import {SIGN_UP_URL, WELCOME_PAGE_URL} from '../../urls'

import {validateEmail, validatePassword} from './SignUpPageComponent'

export const SIGN_UP_EMAIL_CHANGE = 'SIGN_UP_EMAIL_CHANGE'
export const SIGN_UP_PASSWORD_CHANGE = 'SIGN_UP_PASSWORD_CHANGE'
export const PICKED_SHOPS_CHANGE = 'PICKED_SHOPS_CHANGE'
export const ATTEMPT_SIGN_UP = 'ATTEMPT_SIGN_UP'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_RESPONSE = 'SIGN_UP_RESPONSE'
export const SIGN_UP_RESPONSE_FAILED = 'SIGN_UP_RESPONSE_FAILED'
export const TRIGGER_SIGNUP_SPINNER_TIMEOUT = 'TRIGGER_SIGNUP_SPINNER_TIMEOUT'

export const emailChange = (value) => {
  return {
    type: SIGN_UP_EMAIL_CHANGE,
    data: value
  }
}

export const passwordChange = (value) => {
  return {
    type: SIGN_UP_PASSWORD_CHANGE,
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

export const signUpResponse = (json) => {
  return {
    type: SIGN_UP_RESPONSE,
    data: {
      email: json.email,
      isVerified: json.isVerified,
      isModerator: json.isModerator,
      myShops: json.myShops,
      myEmailFrequency: json.myEmailFrequency
    }
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
  dispatch(shouldShowSignupSpinnerTimer())
  return fetch(SIGN_UP_URL, args)
    .then(response => response.json())
    .then(json => {
      if (json.email) {
        dispatch(signUpResponse(json))
        dispatch(push(WELCOME_PAGE_URL))
      } else
        dispatch(signUpResponseFailed(json.invalidEmail))
    })
}

export function shouldShowSignupSpinnerTimer() {
  const SPINNER_MIN_DURATION = 1000 //ms
  return dispatch => {
    return setTimeout(function() {
      dispatch(triggerSignupSpinnerTimeout());
    }, SPINNER_MIN_DURATION);

  }
}

const triggerSignupSpinnerTimeout = () => {
  return {
    type: TRIGGER_SIGNUP_SPINNER_TIMEOUT
  }
}
