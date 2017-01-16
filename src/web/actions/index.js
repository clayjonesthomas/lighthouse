import $ from 'jquery'

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
      url: '/rest/posts',
      dataType: 'json'
    })
      .done((response) => {
        dispatch(addPostReturn(response.json().id, true))
      })
      .fail((response) => {
        dispatch(addPostReturn(0, false))
      })
  }
}