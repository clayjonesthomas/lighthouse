import {LOG_IN_RESPONSE} from '../components/LogInPage/LogInPageActions'
import {SIGN_UP_RESPONSE} from '../components/SignUpPage/SignUpPageActions'
import {LOG_OUT_RESPONSE} from '../services/UserActions'
const defaultUserState = {
  email: '',
  isVerified: false,
  isModerator: false
}

export function user(state = defaultUserState, action) {
  switch (action.type) {
    case LOG_IN_RESPONSE:
      return Object.assign({}, state, {
        email: action.data.email,
        isVerified: action.data.isVerified,
        isModerator: action.data.isModerator
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        email: action.data.email
      })
    case LOG_OUT_RESPONSE:
      return defaultUserState
    default:
      return state
  }
}
