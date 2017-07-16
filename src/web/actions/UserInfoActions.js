import {LOGIN_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const REQUEST_USER_INFO_RETURN = 'REQUEST_USER_INFO_RETURN'

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
