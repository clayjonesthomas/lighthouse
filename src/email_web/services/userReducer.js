import {LOG_IN_RESPONSE} from '../components/LogInPage/LogInPageActions'
import {SIGN_UP_RESPONSE} from '../components/SignUpPage/SignUpPageActions'
import {LOG_OUT_RESPONSE, USER_DATA_RETURN, 
  USER_DATA_RETURN_FAILED, USER_EMAIL_RETURN,
  USER_TRACKED_POSTS_RETURN}
  from '../services/UserActions'

import {MID_FREQUENCY_EMAIL} from '../components/SettingsPage/SettingsPageComponent'

const defaultUserState = {
  email: '',
  isVerified: true,
  isModerator: false,
  myShops: [],
  myEmailFrequency: MID_FREQUENCY_EMAIL,
  isLoadingUserData: true
}

export function user(state = defaultUserState, action) {
  switch (action.type) {
    case LOG_IN_RESPONSE:
      return Object.assign({}, state, {
        email: action.data.email,
        isVerified: action.data.isVerified,
        isModerator: action.data.isModerator,
        myShops: action.data.myShops,
        myEmailFrequency: action.data.myEmailFrequency
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        email: action.data.email,
        myShops: action.data.myShops,
        myEmailFrequency: action.data.myEmailFrequency
      })
    case USER_DATA_RETURN:
      return Object.assign({}, state, {
        myEmailFrequency: action.data.emailFrequency,
        myShops: action.data.myShops,
        email: action.data.email,
        isVerified: action.data.isVerified,
        isModerator: action.data.isModerator,
        isLoadingUserData: false
      })
    case USER_DATA_RETURN_FAILED:
      return defaultUserState
    case LOG_OUT_RESPONSE:
      return defaultUserState
    default:
      return state
  }
}

export function userEmail(state = '', action) {
  switch (action.type) {
    case LOG_IN_RESPONSE:
      return action.data.email
    case SIGN_UP_RESPONSE:
      return action.data.email
    case USER_EMAIL_RETURN:
      return action.data.email
    case LOG_OUT_RESPONSE:
      return ''
    default:
      return state
  }
}

export function userTrackedShops(state = [], action) {
  switch (action.type) {
    case USER_TRACKED_POSTS_RETURN:
      return action.data
    default:
      return state
  }
}
