import {push} from 'react-router-redux'
import {LOGIN_URL, LOGOUT_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const REQUEST_USER_INFO_RETURN = 'REQUEST_USER_INFO_RETURN'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_RESPONSE = 'SIGN_OUT_RESPONSE'

export const requestUserInfo = () => {
  return {
    type: REQUEST_USER_INFO
  }
}

export const requestUserInfoReturn = (info) => {
  return {
    type: REQUEST_USER_INFO_RETURN,
    data: info
  }
}

export function pullUserInfo() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(requestUserInfo())
    return fetch(LOGIN_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(requestUserInfoReturn(json))
      })
  }
}

export function signOut() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(signOutRequest())
    return fetch(LOGOUT_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(signOutResponse(json))
        dispatch(push('/'))
      })
  }
}

export const signOutRequest = () => {
  return {
    type: SIGN_OUT_REQUEST
  }
}

export const signOutResponse = () => {
  return {
    type: SIGN_OUT_RESPONSE
  }
}
