import {RESPONSE_LOGIN} from 'scenes/modals/AuthActions'
import {REQUEST_USER_INFO, REQUEST_USER_INFO_RETURN} from 'features/UserInfo/UserInfoActions'
import {SIGN_OUT_REQUEST, SIGN_OUT_RESPONSE} from 'features/UserInfo/UserInfoActions'
import {SIGN_UP_REQUEST, SIGN_UP_RESPONSE} from 'scenes/modals/AuthActions'
import {IS_USER_MOBILE} from 'features/UserInfo/UserActions'

export function username(state = null, action) {
  switch(action.type) {
    case RESPONSE_LOGIN:
      window.location.reload() // move this out of the reducer
      return action.data.username || null
    case REQUEST_USER_INFO_RETURN:
      return action.data.username || null
    case SIGN_OUT_REQUEST:
      return null
    case SIGN_UP_RESPONSE:
      window.location.reload() // move this out of the reducer
      return action.data.username
    default:
      return state
  }
}

export function isUserInfoLoaded(state = false, action) {
  switch(action.type) {
    case REQUEST_USER_INFO:
      return false
    case REQUEST_USER_INFO_RETURN:
      return true
    case SIGN_OUT_RESPONSE:
      return true
    default:
      return state
  }
}

export function isModerator(state = false, action) {
  switch(action.type) {
    case REQUEST_USER_INFO_RETURN:
      return action.data.isModerator || false
    case SIGN_OUT_REQUEST:
      return false
    default:
      return state
  }
}

export function isMobile(state = false, action) {
  switch(action.type) {
    case IS_USER_MOBILE:
      return action.data.isUserMobile
    default:
      return state
  }
}