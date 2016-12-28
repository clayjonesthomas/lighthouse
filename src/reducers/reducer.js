import {ADD_POST, CANCEL_POST, UPDATE_FORM} from '../actions/index.js'

const initialState = {
  homePosts: []
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, {
        homePosts: [
          ...state.homePosts,
          action.post
        ]
      });

    case CANCEL_POST:
      return state
    default:
      return state
  }
}

export default lighthouse