import $ from 'jquery'
import {AUTH_URL} from '../constants/constants'

export const REQUEST_AUTH = 'REQUEST_AUTH'
export const RESPONSE_AUTH = 'RESPONSE_AUTH'
export const CANCEL_AUTH = 'CANCEL_AUTH'

export const cancelAuth = () => {
  return {
    type: CANCEL_AUTH
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