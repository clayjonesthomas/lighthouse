import {ADD_POST, CANCEL_POST, UPDATE_FORM} from '../actions/index.js'

const initialState = {
  homePosts: []
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORM:
      // consult http://stackoverflow.com/questions/35592078/cleaner-shorter-way-to-update-nested-state-in-redux
      // for compatibility when you have time
      return Object.assign({}, state, {
        formPost: Object.assign({}, state.formPost, {
          [action.key]: action.value
        })
      });

    case ADD_POST:
      return Object.assign({}, state, {
        homePosts: [
          ...state.homePosts,
          action.post
        ]
      });

    case CANCEL_POST:

    default:
      return state
  }
}