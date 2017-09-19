import {RESPONSE_LOGIN, SHOW_MODAL, LOGIN, SIGN_UP, INFO,
  CANCEL, SIGN_UP_RESPONSE} from 'scenes/modals/AuthActions'

export function modal(state = null, action) {
  switch(action.type) {
    case SHOW_MODAL:
      switch (action.meta) {
        default:
        case CANCEL:
          return null
        case SIGN_UP:
          return SIGN_UP
        case LOGIN:
          return LOGIN
        case INFO:
          return INFO
      }
    case RESPONSE_LOGIN:
      window.location.reload() // should be refactored out of the reducer
      return null
    case SIGN_UP_RESPONSE:
      window.location.reload() // should be refactored out of the reducer
      return null
    default:
      return state
  }
}