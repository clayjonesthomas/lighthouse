import $ from 'jquery'
import {POSTS_URL} from '../constants/constants'

export const ADD_POST = 'ADD_POST'
export const ADD_POST_RETURN = 'ADD_POST_RETURN'
export const CANCEL_POST = 'CANCEL_POST'

let nextPostId = 0
export const addPost = (post) => {
  return {
    type: ADD_POST,
    id: nextPostId++,
    post
  }
}

export const addPostReturn = (postId, wasPostAdded) => {
  return {
    type: ADD_POST_RETURN,
    postId: postId,
    wasPostAdded: wasPostAdded
  }
}

export const cancelPost = () => {
  return {
    type: CANCEL_POST
  }
}

export function pushPost(post) {
  return dispatch => {
    dispatch(addPost(post))
    return $.ajax({
      method: 'POST',
      url: POSTS_URL,
      dataType: 'json',
      data: post
    })
      .done((response) => {
        dispatch(addPostReturn(response.id, true))
      })
      .fail((response) => {
        dispatch(addPostReturn(0, false))
      })
  }
}