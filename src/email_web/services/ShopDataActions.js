import fetch from 'isomorphic-fetch'

import {MY_SHOPS_URL, SHOPS_URL} from '../urls'

export const ALL_SHOPS_REQUEST = 'ALL_SHOPS_REQUEST'
export const ALL_SHOPS_RESPONSE = 'ALL_SHOPS_RESPONSE'
export const MY_SHOPS_REQUEST = 'MY_SHOPS_REQUEST'
export const MY_SHOPS_RESPONSE = 'MY_SHOPS_RESPONSE'

export const myShopsRequest = () => {
  return {
    type: MY_SHOPS_REQUEST
  }
}

export const myShopsResponse = (shops) => {
  return {
    type: MY_SHOPS_RESPONSE,
    data: shops
  }
}

export function pullMyShops() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(myShopsRequest())
    return fetch(MY_SHOPS_URL, args)
      .then(response => response.json())
      .then(json => dispatch(myShopsResponse(json)))
  }
}

export const requestShops = () => {
  return {
    type: ALL_SHOPS_REQUEST
  }
}

export const requestShopsResponse = (shops) => {
  return {
    type: ALL_SHOPS_RESPONSE,
    data: shops
  }
}

export function pullAllShops() {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    dispatch(requestShops())
    return fetch(SHOPS_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(requestShopsResponse(json.shops))
      })
  }
}


