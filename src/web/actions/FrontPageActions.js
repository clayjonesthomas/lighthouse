import {POSTS_URL, LOGIN_URL} from '../constants/constants'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const REQUEST_POSTS_RETURN = 'REQUEST_POSTS_RETURN'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const REQUEST_USER_INFO_RETURN = 'REQUEST_USER_INFO_RETURN'

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  }
}

export const requestPostsReturn = (posts) => {
  return {
    type: REQUEST_POSTS_RETURN,
    data: posts
  }
}

export const requestUserInfo = () => {
  return {
    type: REQUEST_USER_INFO
  }
}

export const requestUserInfoReturn = (info) => {
  return {
    type: REQUEST_USER_INFO_RETURN,
    data: info
  }
}

export function pullFrontPagePosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(POSTS_URL)
      .then(response => response.json())
      .then(json => dispatch(requestPostsReturn(json)))
  }
}

export function pullUserInfo() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(requestUserInfo())
    return fetch(LOGIN_URL, args)
      .then(response => response.json())
      .then(json => {
        dispatch(requestUserInfoReturn(json))
      })
  }
}