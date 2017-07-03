import {POST_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_SINGLE_POST = 'REQUEST_POSTS'
export const REQUEST_SINGLE_POST_RETURN = 'REQUEST_POSTS_RETURN'

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