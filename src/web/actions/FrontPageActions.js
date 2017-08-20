import {POSTS_URL, POST_URL, NOT_MY_SHOPS_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'
import {requestShops, requestShopsReturn} from './NewPostActions'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POSTS_RETURN = 'REQUEST_POSTS_RETURN'
export const MORE_POSTS_REQUEST = 'MORE_POSTS_REQUEST'
export const MORE_POSTS_RETURN = 'MORE_POSTS_RETURN'
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_RETURN = 'DELETE_POST_RETURN'

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

export function deletePost(key){
  const args = {
    method: 'DELETE',
    credentials: 'same-origin'
  }

  return dispatch => {
    dispatch(deletePostRequest())
    return fetch(POST_URL+`/${key}`, args)
      .then(response => response.json())
      .then(json => dispatch(deletePostReturn(json)))
  }
}

const deletePostRequest = () => {
  return {
    type: DELETE_POST_REQUEST
  }
}

const deletePostReturn = () => {
  return {
    type: DELETE_POST_RETURN
  }
}

export function pullNotMyShops() {
  return (dispatch) => {
    const args = {
      method: 'GET',
      credentials: 'same-origin'
    }

    // add unique actions for this action, or maybe not?
    dispatch(requestShops())
    return fetch(NOT_MY_SHOPS_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(requestShopsReturn(json.shops))
      })
  }
}