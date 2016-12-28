export const ADD_POST = 'ADD_POST'
export const CANCEL_POST = 'CANCEL_POST'
export const UPDATE_FORM = 'UPDATE_FORM'


let nextPostId = 0
export const addPost = (post) => {
  return {
    type: ADD_POST,
    id: nextPostId++,
    post
  }
}

export const cancelPost = () => {
  return {
    type: CANCEL_POST
  }
}

export const updateForm = (key, value) => {
  return {
    type: UPDATE_FORM,
    key,
    value
  }
}
