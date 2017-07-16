import fetch from 'isomorphic-fetch'
import {POST_URL, SHOPS_URL} from '../constants/constants'

export const ADD_POST = 'ADD_POST'
export const ADD_POST_RETURN = 'ADD_POST_RETURN'
export const CANCEL_POST = 'CANCEL_POST'
export const SAVE_NEW_POST_FORM_REF = 'SAVE_NEW_POST_FORM_REF'
export const REQUEST_SHOPS = "REQUEST_SHOPS"
export const REQUEST_SHOPS_RETURN = "REQUEST_SHOPS_RETURN"

export const onSaveRef = (ref, type) => {
  return {
    type: SAVE_NEW_POST_FORM_REF,
    data: {
      type: type,
      ref: ref
    }
  }
}

let nextPostId = 0
export const addPost = (post) => {
  return {
    type: ADD_POST,
    id: nextPostId++,
    post
  }
}

export const addPostReturn = (postKey) => {
  return {
    type: ADD_POST_RETURN,
    postKey: postKey
  }
}

export const cancelPost = () => {
  return {
    type: CANCEL_POST
  }
}

export function pushPost() {
  return (dispatch, getState) => {
    const refs = getState().formRefs
    const title = refs.title.value
    const post_data = {
      title: title,
      store: ''
    }
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(post_data)
    }

    dispatch(addPost(post_data))
    return fetch(POST_URL, args)
      .then(response => response.json())
      .then(json => dispatch(addPostReturn(json.key)))
  }
}

export const requestShops = () => {
  return {
    type: REQUEST_SHOPS
  }
}

export const requestShopsReturn = (shops) => {
  return {
    type: REQUEST_SHOPS_RETURN,
    data: {
      shops: shops
    }
  }
}

export function pullShops() {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    dispatch(requestShops())
    return fetch(SHOPS_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(requestShopsReturn(json.shops))
      })
  }
}