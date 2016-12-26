let nextPostId = 0
export const addPost = (post) => {
  return {
    type: 'ADD_POST',
    id: nextPostId++
  }
}

export const cancelPost = () => {
  return {
    type: 'CANCEL_POST'
  }
}

export const updateForm = (key, value) => {
  return {
    type: 'UPDATE_FORM',
    key,
    value
  }
}
