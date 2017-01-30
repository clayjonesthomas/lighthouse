import {ADD_POST, CANCEL_POST} from '../actions/NewPostActions.js'
import {REQUEST_POSTS_RETURN} from '../actions/FrontPageActions'
import {RESPONSE_AUTH, SHOW_LOGIN, SHOW_SIGN_UP, CANCEL_MODAL}
  from '../actions/AuthActions.js'

import {LOGIN_MODAL, SIGN_UP_MODAL} from '../constants/constants'

const initialState = {
  displayedPosts: [],
  jwt: null,
  showModalType: null
}

function lighthouse(state = initialState, action) {
  switch (action.type) {
    case CANCEL_MODAL:
      return Object.assign({}, state, {
        showModalType: null,
      })
    case SHOW_SIGN_UP:
      return Object.assign({}, state, {
        showModalType: SIGN_UP_MODAL,
      })
    case SHOW_LOGIN:
      return Object.assign({}, state, {
        showModalType: LOGIN_MODAL,
      })
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