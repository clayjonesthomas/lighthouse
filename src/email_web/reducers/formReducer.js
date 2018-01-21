import {SIGNUP_EMAIL_CHANGE,
  SIGNUP_PASSWORD_CHANGE} from '../components/SignUpPage/SignUpPageActions'

const defaultState = {
  email: '',
  password: ''
}

export function signup(state = defaultState, action) {
  switch (action.type) {
    case SIGNUP_EMAIL_CHANGE:
      return Object.assign({}, state, {
        email: action.value
      })
    case SIGNUP_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        password: action.value
      })
    default:
      return state
  }
}
