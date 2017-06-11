import {ADD_POST, CANCEL_POST} from '../actions/NewPostActions.js'
import {GO_HOME, GO_MY_SHOPS, GO_PROFILE} from '../actions/MenuActions.js'
import {REQUEST_POSTS_RETURN} from '../actions/FrontPageActions'
import {RESPONSE_AUTH, SHOW_MODAL, LOGIN, SIGN_UP, CANCEL}
  from '../actions/AuthActions.js'

const initialState = {
  displayedPosts: [],
  jwt: null,
  modal: null
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      switch (action.meta) {
        default:
        case CANCEL:
          return Object.assign({}, state, {
            modal: null,
          })
        case SIGN_UP:
          return Object.assign({}, state, {
            modal: SIGN_UP,
          })
        case LOGIN:
          return Object.assign({}, state, {
            modal: LOGIN,
          })
      }
    case REQUEST_POSTS_RETURN:
      return Object.assign({}, state, {
        displayedPosts: action.data,
      })
    case GO_MY_SHOPS:
    case GO_PROFILE:
    case GO_HOME:
    case ADD_POST:
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