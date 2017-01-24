import {ADD_POST, CANCEL_POST} from '../actions/NewPostActions.js'
import {REQUEST_POSTS_RETURN} from '../actions/FrontPageActions'
import {RESPONSE_AUTH} from '../actions/AuthActions.js'

const initialState = {
  displayedPosts: [],
  jwt: null
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS_RETURN:
      return Object.assign({}, state, {
        displayedPosts: action.data,
      })
    case ADD_POST:
      return state
    case CANCEL_POST:
      return state
    case RESPONSE_AUTH:
      return Object.assign({}, state, {
        jwt: action.data.jwt
      })
    default:
      return state
  }
}

export default lighthouse