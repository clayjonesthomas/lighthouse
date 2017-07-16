import {MY_SHOPS_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_MY_SHOPS = 'REQUEST_MY_SHOPS'
export const REQUEST_MY_SHOPS_RETURN = 'REQUEST_MY_SHOPS_RETURN'

export const requestMyShops = () => {
  return {
    type: REQUEST_MY_SHOPS
  }
}

export const requestMyShopsReturn = (shops) => {
  return {
    type: REQUEST_MY_SHOPS_RETURN,
    data: shops
  }
}

export function pullMyShops() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(requestMyShops())
    return fetch(MY_SHOPS_URL, args)
      .then(response => response.json())
      .then(json => dispatch(requestMyShopsReturn(json)))
  }
}