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
    data: posts
  }
}

export function pullFrontPagePosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(POSTS_URL)
      .then(response => response.json())
      .then(json => dispatch(requestPostsReturn(json)))
    // $.ajax({
    //   method: 'GET',
    //   url: POSTS_URL
    // })
    //   .done((response) => {
    //     dispatch(requestPostsReturn(JSON.parse(response)))
    //   })
    //   //.fail TODO
  }
}