import {MY_SHOPS_URL, LIKE_STORE_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_MY_SHOPS = 'REQUEST_MY_SHOPS'
export const REQUEST_MY_SHOPS_RETURN = 'REQUEST_MY_SHOPS_RETURN'
export const ADD_SHOPS_TO_MY_SHOPS_REQUEST = 'ADD_SHOPS_TO_MY_SHOPS_REQUEST'
export const ADD_SHOPS_TO_MY_SHOPS_RETURN = 'ADD_SHOPS_TO_MY_SHOPS_RETURN'

export const requestMyShops = () => {
  return {
    type: REQUEST_MY_SHOPS
  }
}

export const requestMyShopsReturn = (shops) => {
  return {
    type: REQUEST_MY_SHOPS_RETURN,
    data: {
      shops: shops
    }
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

export function AddShopsToMyShopsRequest(){
  return {
    type: ADD_SHOPS_TO_MY_SHOPS_REQUEST
  }
}

export function AddShopsToMyShopsReturn(shopsToAdd){
  return {
    type: ADD_SHOPS_TO_MY_SHOPS_RETURN,
    data: {
      shopsToAdd: shopsToAdd
    }
  }
}

export function addShopsToMyShops(){
  return (dispatch, getState) => {
    const state = getState()
    const shops = state.form.shops.map(shop => {
      return {
        key: shop.key
      }
    })
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(shops)
    }
    dispatch(AddShopsToMyShopsRequest())
    return fetch(LIKE_STORE_URL, args)
      .then(response => response.json())
      .then(json => dispatch(AddShopsToMyShopsReturn(json.shopsToAdd)))
  }
}