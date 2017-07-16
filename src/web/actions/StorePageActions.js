import fetch from 'isomorphic-fetch'
import {STORE_URL, LIKE_STORE_URL} from '../constants/constants'

export const REQUEST_STORE = "REQUEST_STORE"
export const REQUEST_STORE_RETURN = "REQUEST_STORE_RETURN"
export const LIKE_STORE = "LIKE_STORE"
export const LIKE_STORE_RETURN = "LIKE_STORE_RETURN"

export const requestStore = () => {
  return {
    type: REQUEST_STORE
  }
}

export const responseStore = (store) => {
  return {
    type: REQUEST_STORE_RETURN,
    data: {
      store: store
    }
  }
}

export function pullStore(url_key) {
  const args = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return dispatch => {
    dispatch(requestStore())
    return fetch(STORE_URL+`/${url_key}`, args)
      .then(response => response.json())
      .then(json => dispatch(responseStore(json.store)))
  }
}

export const likeStore = (store_url) => {
  return {
    type: LIKE_STORE,
    data: {
      post_url: store_url
    }
  }
}

export const likeStoreReturn = (json) => {
  return {
    type: LIKE_STORE_RETURN,
    data: json
  }
}


export function toggleStoreLike(store_url) {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      store_url: store_url
    })
  }
  return dispatch => {
    dispatch(likeStore(store_url))
    return fetch(LIKE_STORE_URL, args)
      .then(likeStoreReturn())
  }
}
