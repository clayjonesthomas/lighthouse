import {POSTS_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POSTS_RETURN = 'REQUEST_POSTS_RETURN'

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  }
}

export const requestPostsReturn = (posts) => {
  return {
    type: REQUEST_POSTS_RETURN,
    data: {
      posts: posts
    }
  }
}

export function pullFrontPagePosts() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(requestPosts())
    return fetch(POSTS_URL, args)
      .then(response => response.json())
      .then(json => dispatch(requestPostsReturn(json)))
  }
}