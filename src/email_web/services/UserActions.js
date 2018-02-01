import {LOG_OUT_URL, USER_DATA_URL} from '../urls'
import fetch from 'isomorphic-fetch'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_RESPONSE = 'LOG_OUT_RESPONSE'
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST'
export const USER_DATA_RETURN = 'USER_DATA_RETURN'

const logOutRequest = () => {
  return {
    type: LOG_OUT_REQUEST
  }
}

const logOutResponse = () => {
  return {
    type: LOG_OUT_RESPONSE
  }
}

export const logOut = () => {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    dispatch(logOutRequest())
    return fetch(LOG_OUT_URL, args)
      .then(response => response.json())
      .then(() => {
        dispatch(logOutResponse())
      })
  }
}


export const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST
  }
}

export const userDataReturn = (userData) => {
  return {
    type: USER_DATA_RETURN,
    data: userData
  }
}

export function pullUserData() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(userDataRequest())
    return fetch(USER_DATA_URL, args)
      .then(response => response.json())
      .then(json => dispatch(userDataReturn(json)))
  }
}
