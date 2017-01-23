import $ from 'jquery'
import {POSTS_URL} from '../constants/constants'

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
    return $.ajax({
      method: 'GET',
      url: POSTS_URL
    })
      .done((response) => {
        dispatch(requestPostsReturn(JSON.parse(response)))
      })
      //.fail TODO
  }
}