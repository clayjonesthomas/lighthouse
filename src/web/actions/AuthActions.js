import fetch from 'isomorphic-fetch'
import {LOGIN_URL} from '../constants/constants'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const SHOW_MODAL = 'SHOW_MODEL'
export const CANCEL = 'CANCEL'
export const SIGN_UP = 'SIGN_UP'
export const LOGIN = 'LOGIN'

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

export const responseLogin = (jwt) => {
  return {
    type: RESPONSE_LOGIN,
    data: {
      jwt: jwt
    }
  }
}

export function logInUser(user, pass) {
  var args = {
    method: 'POST',
    data: {
      username: user,
      password: pass
    }
  }
  return dispatch => {
    dispatch(requestLogin())
    return fetch(LOGIN_URL, args)
      .then(response => dispatch(responseLogin(response)))
  }
}
