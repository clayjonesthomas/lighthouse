import fetch from 'isomorphic-fetch'
import {MY_POSTS_URL} from '../../constants/constants'

export const MY_POSTS_REQUEST = 'MY_POSTS_REQUEST'
export const MY_POSTS_RESPONSE = 'MY_POSTS_RESPONSE'
export const MORE_MY_POSTS_REQUEST = 'MORE_MY_POSTS_REQUEST'
export const MORE_MY_POSTS_RESPONSE = 'MORE_MY_POSTS_RESPONSE'

const myPostsRequest = () => {
  return {
    type: MY_POSTS_REQUEST
  }
}

const myPostsResponse = (posts) => {
  return {
    type: MY_POSTS_RESPONSE,
    data: {
      posts: posts
    }
  }
}

export function pullMyPosts() {
  const args = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return dispatch => {
    dispatch(myPostsRequest())
    return fetch(MY_POSTS_URL+`/${0}`, args)
      .then(response => response.json())
      .then(json => dispatch(myPostsResponse(json)))
  }
}

const moreMyPostsRequest = () => {
  return {
    type: MORE_MY_POSTS_REQUEST
  }
}

const moreMyPostsResponse = (posts) => {
  return {
    type: MORE_MY_POSTS_RESPONSE,
    data: {
      posts: posts
    }
  }
}

export function pullMoreMyPosts() {
  const args = {
    method: 'GET',
    credentials: 'same-origin'
  }
  return (dispatch, getState) => {
    const state = getState()
    const offset = state.postsOffset
    dispatch(moreMyPostsRequest())
    return fetch(MY_POSTS_URL+`/${offset}`, args)
      .then(response => response.json())
      .then(json => dispatch(moreMyPostsResponse(json)))
  }
}