import fetch from 'isomorphic-fetch'
import {SHOP_URL, SHOP_POST_URL, LIKE_SHOP_URL, EDIT_SHOP_URL} from '../../constants/constants'

export const REQUEST_SHOP = "REQUEST_SHOP"
export const REQUEST_SHOP_RETURN = "REQUEST_SHOP_RETURN"
export const LIKE_SHOP = "LIKE_SHOP"
export const LIKE_SHOP_RETURN = "LIKE_SHOP_RETURN"
export const SHOP_POSTS_REQUEST = 'SHOP_POSTS_REQUEST'
export const SHOP_POSTS_RETURN = 'SHOP_POSTS_RETURN'
export const MORE_SHOP_POSTS_REQUEST = 'MORE_SHOP_POSTS_REQUEST'
export const MORE_SHOP_POSTS_RETURN = 'MORE_SHOP_POSTS_RETURN'
export const TOGGLE_EDIT_SHOP = 'TOGGLE_EDIT_SHOP'
export const EDIT_SHOP_REQUEST = 'EDIT_SHOP_REQUEST'
export const EDIT_SHOP_RESPONSE = 'EDIT_SHOP_RESPONSE'
export const SHOP_DUMMY_SPINNER_START = 'SHOP_DUMMY_SPINNER_START'
export const SHOP_DUMMY_SPINNER_TIMEOUT = 'SHOP_DUMMY_SPINNER_TIMEOUT'

export const requestShop = () => {
  return {
    type: REQUEST_SHOP
  }
}

export const responseShop = (shop) => {
  return {
    type: REQUEST_SHOP_RETURN,
    data: {
      shop: shop
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

export const likeShop = (shop_key) => {
  return {
    type: LIKE_SHOP,
    data: {
      shop_key: shop_key
    }
  }
}

export const likeShopReturn = (json) => {
  return {
    type: LIKE_SHOP_RETURN,
    data: json
  }
}


export function toggleShopLike(shop_key) {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      key: shop_key
    })
  }
  return dispatch => {
    dispatch(likeShop(shop_key))
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

const toggleEditShopAction = () => {
  return {
    type: TOGGLE_EDIT_SHOP
  }
}

export function toggleEditShop() {
  return dispatch => 
    dispatch(toggleEditShopAction())
    return;
}

export function submitShopEdits(shop_key) {
  return (dispatch, getState) => {
    const state = getState()
    const refs = state.formRefs
    const name = refs.shop_name.value
    const website = refs.shop_website.value
    const icon_url = refs.icon_url.value
    
    const body = {
      key: shop_key,
      name: name,
      website: website,
      icon_url: icon_url,
    }
    
    const formArgs = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(body)
    }

    dispatch(onSubmitEditRequest())

    return fetch(EDIT_SHOP_URL, formArgs)
      .then(response => response.json())
      .then(json => onSubmitEditResponse())
  }
}

export const onSubmitEditRequest = () => {
  return {
    type: EDIT_SHOP_REQUEST
  }
}

export const onSubmitEditResponse = () => {
  return {
    type: EDIT_SHOP_RESPONSE
  }
}

export function startDummySpinnerTimer() {
  const DUMMY_SPINNER_DURATION = 1000 //ms
  return dispatch => {
    dispatch(shopDummySpinnerStart())
    return setTimeout(function() {
      dispatch(shopDummySpinnerTimeout());
    }, DUMMY_SPINNER_DURATION);

  }
}

const shopDummySpinnerStart = () => {
  return {
    type: SHOP_DUMMY_SPINNER_START
  }
}

const shopDummySpinnerTimeout = () => {
  return {
    type: SHOP_DUMMY_SPINNER_TIMEOUT
  }
}
