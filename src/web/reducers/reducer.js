import {ADD_POST, CANCEL_POST} from '../actions/actions.js'

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
      console.log(state)
      return state
    default:
      return state
  }
}

export default lighthouse