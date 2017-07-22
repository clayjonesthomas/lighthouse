import {POST_URL, LIKE_POST_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_SINGLE_POST = 'REQUEST_POSTS'
export const REQUEST_SINGLE_POST_RETURN = 'REQUEST_POSTS_RETURN'
export const LIKE_POST = 'LIKE_POST'
export const LIKE_POST_RETURN = 'LIKE_POST_RETURN'

export const requestSinglePost = () => {
  return {
    type: REQUEST_SINGLE_POST
  }
}

export const requestSinglePostReturn = (post) => {
  return {
    type: REQUEST_SINGLE_POST_RETURN,
    data: post
  }
}

export function pullSinglePost(url_key) {
  return dispatch => {
    dispatch(requestSinglePost())
    return fetch(POST_URL+`/${url_key}`)
      .then(response =>{
        response.json()
      })
      .then(json => dispatch(requestSinglePostReturn(json)))
  }
}

export const likePost = (post_key) => {
  return {
    type: LIKE_POST,
    data: {
      post_key: post_key
    }
  }
}

export const likePostReturn = (json) => {
 return {
   type: LIKE_POST_RETURN,
   data: json
 }
}


export function togglePostLike(post_key) {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      key: post_key
    })
  }
  return dispatch => {
    dispatch(likePost(post_key))
    return fetch(LIKE_POST_URL, args)
      .then(likePostReturn())
  }
}