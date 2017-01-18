import {ADD_POST, CANCEL_POST} from '../actions/NewPostActions.js'
import {REQUEST_POSTS_RETURN} from '../actions/FrontPageActions'

const initialState = {
  homePosts: []
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS_RETURN:
    case ADD_POST:
      return state
    case CANCEL_POST:
      return state
    default:
      return state
  }
}

export default lighthouse