import {MY_SHOPS_URL, LIKE_STORE_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'
import {pullFrontPagePosts} from '../actions/FrontPageActions'
import {pullShops} from '../actions/NewPostActions'

export const REQUEST_MY_SHOPS = 'REQUEST_MY_SHOPS'
export const REQUEST_MY_SHOPS_RETURN = 'REQUEST_MY_SHOPS_RETURN'
export const ADD_SHOPS_TO_MY_SHOPS_REQUEST = 'ADD_SHOPS_TO_MY_SHOPS_REQUEST'
export const ADD_SHOPS_TO_MY_SHOPS_RETURN = 'ADD_SHOPS_TO_MY_SHOPS_RETURN'
export const ADD_SHOP_FINDER_REF = 'ADD_SHOP_FINDER_REF'
export const CLEAR_SHOP_FINDER = 'CLEAR_SHOP_FINDER'

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

export const AddShopsToMyShopsRequest = () => {
  return {
    type: ADD_SHOPS_TO_MY_SHOPS_REQUEST
  }
}

export const AddShopsToMyShopsReturn = (shopsToAdd) => {
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
    if(state.form.shops) {
      const shops = state.form.shops.map(shop => {
        return shop.key
      })
      const body = {
        keys: shops
      }
      const args = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(body)
      }
      dispatch(AddShopsToMyShopsRequest())
      return fetch(LIKE_STORE_URL, args)
        .then(response => response.json())
        .then(json => {
          dispatch(AddShopsToMyShopsReturn(json))
          dispatch(pullFrontPagePosts())
          dispatch(pullShops())
        })
    }
  }
}

export const addShopFinderRef = (ref) => {
  return {
    type: ADD_SHOP_FINDER_REF,
    data: {
      ref: ref
    }
  }
}

export function clearShopFinder() {
  return (dispatch, getState) => {
    const state = getState()
    const shopFinder = state.formRefs.shopFinder
    if(shopFinder){
      shopFinder.getInstance().clear()
    }
  }
}