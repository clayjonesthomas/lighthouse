import $ from 'jquery'
import {AUTH_URL} from '../constants/constants'

export const REQUEST_AUTH = 'REQUEST_AUTH'
export const RESPONSE_AUTH = 'RESPONSE_AUTH'
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

export const requestAuth = (user, pass) => {
  return {
    type: REQUEST_AUTH,
    data: {
      username: user,
      password: pass
    }
  }
}

export const responseAuth = (jwt) => {
  return {
    type: RESPONSE_AUTH,
    data: {
      jwt: jwt
    }
  }
}

export function authorizeUser(user, pass) {
  return dispatch => {
    dispatch(requestAuth(user, pass))
    return $.ajax({
      method: 'POST',
      url: AUTH_URL
    })
      .done((response) => {
        dispatch(responseAuth(response))
      })
      //.fail TODO
  }
}