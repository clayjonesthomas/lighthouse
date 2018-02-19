import {push} from 'react-router-redux'

import {LOG_OUT_URL, USER_DATA_URL, 
  USER_EMAIL_URL, LANDING_PAGE_URL}
  from '../urls'
import fetch from 'isomorphic-fetch'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_RESPONSE = 'LOG_OUT_RESPONSE'
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST'
export const USER_DATA_RETURN = 'USER_DATA_RETURN'
export const USER_DATA_RETURN_FAILED = 'USER_DATA_RETURN_FAILED'
export const USER_EMAIL_REQUEST = 'USER_EMAIL_REQUEST'
export const USER_EMAIL_RETURN = 'USER_EMAIL_RETURN'
export const USER_EMAIL_RETURN_FAILED = 'USER_EMAIL_RETURN_FAILED'

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
        dispatch(push(LANDING_PAGE_URL))
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

export const userDataReturnFailed = () => {
  return {
    type: USER_DATA_RETURN_FAILED
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
      .then(json => {
        if(json.email) {
          dispatch(userDataReturn(json));
        } else
          dispatch(userDataReturnFailed())
      })
  }
}

export const userEmailRequest = () => {
  return {
    type: USER_EMAIL_REQUEST
  }
}

export const userEmailReturn = (userEmail) => {
  return {
    type: USER_EMAIL_RETURN,
    data: userEmail
  }
}

export const userEmailReturnFailed = () => {
  return {
    type: USER_EMAIL_RETURN_FAILED
  }
}

export function pullUserEmail() {
  var tempEmailCookie = document.cookie.match(new RegExp("temp_email_cookie" + '=([^;]+)'));

  return dispatch => {
    if (tempEmailCookie) {
      dispatch(userEmailReturn({'email' : tempEmailCookie[1]}))
      return
    } 

    const args = {
      method: 'GET',
      credentials: 'same-origin',
    }

    dispatch(userEmailRequest())
    return fetch(USER_EMAIL_URL, args)
      .then(response => response.json())
      .then(json => {
        if(json.email) {
          dispatch(userEmailReturn(json))
        } else
          dispatch(userEmailReturnFailed())
      })
  }
}

