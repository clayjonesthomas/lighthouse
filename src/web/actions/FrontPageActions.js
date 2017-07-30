import {POSTS_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POSTS_RETURN = 'REQUEST_POSTS_RETURN'
export const MORE_POSTS_REQUEST = 'MORE_POSTS_REQUEST'
export const MORE_POSTS_RETURN = 'MORE_POSTS_RETURN'

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
    return fetch(POSTS_URL+`/${0}`, args)
      .then(response => response.json())
      .then(json => dispatch(requestPostsReturn(json)))
  }
}

export const morePostsRequest = () => {
  return {
    type: MORE_POSTS_REQUEST
  }
}

export const morePostsReturn = (posts) => {
  return {
    type: MORE_POSTS_RETURN,
    data: {
      posts: posts
    }
  }
}

export function pullMoreFrontPagePosts() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return (dispatch, getState) => {
    const state = getState()
    const offset = state.postsOffset
    dispatch(morePostsRequest())
    return fetch(POSTS_URL+`/${offset}`, args)
      .then(response => response.json())
      .then(json => dispatch(morePostsReturn(json)))
  }
}