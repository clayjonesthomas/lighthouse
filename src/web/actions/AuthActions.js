import fetch from 'isomorphic-fetch'
import {LOGIN_URL, SIGN_UP_URL} from '../constants/constants'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const SHOW_MODAL = 'SHOW_MODEL'
export const CANCEL = 'CANCEL'
export const SIGN_UP = 'SIGN_UP'
export const LOGIN = 'LOGIN'
export const REF_FUNC_AUTH = 'REF_FUNC_AUTH'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_RESPONSE = 'SIGN_UP_RESPONSE'

export const SIGN_UP_USERNAME = 'SIGN_UP_USERNAME'
export const SIGN_UP_PASSWORD_1 = 'SIGN_UP_PASSWORD_1'
export const SIGN_UP_PASSWORD_2 = 'SIGN_UP_PASSWORD_2'
export const LOGIN_USERNAME = 'LOGIN_USERNAME'
export const LOGIN_PASSWORD = 'LOGIN_PASSWORD'

export const LOGIN_RESPONSE_FAILED = 'LOGIN_RESPONSE_FAILED'
export const SIGN_UP_RESPONSE_FAILED = 'SIGN_UP_RESPONSE_FAILED'
export const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'

export const cancelModal = () => {
  return {
    type: SHOW_MODAL,
    meta: CANCEL
  }
}

export const showSignUp = () => {
  return {
    type: SHOW_MODAL,
    meta: SIGN_UP
  }
}

export const showLogin = () => {
  return {
    type: SHOW_MODAL,
    meta: LOGIN
  }
}

export const requestLogin = () => {
  return {
    type: REQUEST_LOGIN
  }
}

export const responseLogin = (username) => {
  return {
    type: RESPONSE_LOGIN,
    data: {
      username: username
    }
  }
}

export const loginResponseFailed = (error) => {
  return {
    type: LOGIN_RESPONSE_FAILED,
    data: {
      error: error
    }
  }
}

export function logInUser() {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const username = refs[LOGIN_USERNAME].value
    const password = refs[LOGIN_PASSWORD].value
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    dispatch(requestLogin())
    return fetch(LOGIN_URL, args)
      .then(response => response.json())
      .then(json => {
        if(json.username)
          dispatch(responseLogin(json.username))
        else
          dispatch(loginResponseFailed(json.error))
      })
  }
}

export const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

export const signUpResponse = (username) => {
  return {
    type: SIGN_UP_RESPONSE,
    data: {
      username: username
    }
  }
}

export const signUpResponseFailed = (error) => {
  return {
    type: SIGN_UP_RESPONSE_FAILED,
    data: {
      error: error
    }
  }
}

export function signUpUser() {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const username = refs[SIGN_UP_USERNAME].value
    const password = refs[SIGN_UP_PASSWORD_1].value
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    dispatch(signUpRequest())
    return fetch(SIGN_UP_URL, args)
      .then(response => response.json())
      .then(json => {
        if(json.username)
          dispatch(signUpResponse(json.username))
        else
          dispatch(signUpResponseFailed(json.error))
      })
  }
}

export const clearErrorMessage = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  }
}