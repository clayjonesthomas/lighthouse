import fetch from 'isomorphic-fetch'
import {SHOP_URL, SHOP_POST_URL, LIKE_SHOP_URL} from '../constants/constants'

export const REQUEST_SHOP = "REQUEST_SHOP"
export const REQUEST_SHOP_RETURN = "REQUEST_SHOP_RETURN"
export const LIKE_SHOP = "LIKE_SHOP"
export const LIKE_SHOP_RETURN = "LIKE_SHOP_RETURN"
export const SHOP_POSTS_REQUEST = 'SHOP_POSTS_REQUEST'
export const SHOP_POSTS_RETURN = 'SHOP_POSTS_RETURN'
export const MORE_SHOP_POSTS_REQUEST = 'MORE_SHOP_POSTS_REQUEST'
export const MORE_SHOP_POSTS_RETURN = 'MORE_SHOP_POSTS_RETURN'


export const requestShop = () => {
  return {
    type: REQUEST_SHOP
  }
}

export const responseShop = (store) => {
  return {
    type: REQUEST_SHOP_RETURN,
    data: {
      store: store
    }
  }
}

export function pullShop(url_key) {
  const args = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return dispatch => {
    dispatch(requestShop())
    return fetch(SHOP_URL+`/${url_key}`, args)
      .then(response => response.json())
      .then(json => dispatch(responseShop(json.shop)))
  }
}

export const likeShop = (store_key) => {
  return {
    type: LIKE_SHOP,
    data: {
      store_key: store_key
    }
  }
}

export const likeShopReturn = (json) => {
  return {
    type: LIKE_SHOP_RETURN,
    data: json
  }
}


export function toggleShopLike(store_key) {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      key: store_key
    })
  }
  return dispatch => {
    dispatch(likeShop(store_key))
    return fetch(LIKE_SHOP_URL, args)
      .then(likeShopReturn())
  }
}

export function pullShopPosts(url_key) {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(shopPostsRequest())
    return fetch(SHOP_POST_URL+`/${url_key}/${0}`, args)
      .then(response => response.json())
      .then(json => dispatch(shopPostsReturn(json)))
  }
}

const shopPostsRequest = () => {
  return {
    type: SHOP_POSTS_REQUEST
  }
}

const shopPostsReturn = (shopPosts) => {
  return {
    type: SHOP_POSTS_RETURN,
    data: {
      shopPosts: shopPosts
    }
  }
}

export function pullMoreShopPosts(url_key) {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return (dispatch, getState) => {
    const state = getState()
    const offset = state.shopPostsOffset
    dispatch(moreShopPostsRequest())
    return fetch(SHOP_POST_URL+`/${url_key}/${offset}`, args)
      .then(response => response.json())
      .then(json => dispatch(moreShopPostsReturn(json)))
  }
}

const moreShopPostsRequest = () => {
  return {
    type: MORE_SHOP_POSTS_REQUEST
  }
}

const moreShopPostsReturn = (shopPosts) => {
  return {
    type: MORE_SHOP_POSTS_RETURN,
    data: {
      shopPosts: shopPosts
    }
  }
}