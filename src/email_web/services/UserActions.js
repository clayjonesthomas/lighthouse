import {LOG_OUT_URL} from '../urls'
import fetch from 'isomorphic-fetch'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_RESPONSE = 'LOG_OUT_RESPONSE'

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
