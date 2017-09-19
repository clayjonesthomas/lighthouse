import {SET_NOTIFICATION, REMOVE_NOTIFICATION,
  SET_MUST_BE_SIGNED_IN_NOTIFICATION, MUST_SIGN_IN}
  from "scenes/notifications/NotificationActions"

export function notification(state = null, action) {
  switch(action.type) {
    case SET_NOTIFICATION:
      return {
          type: action.data.notification
        }
    case REMOVE_NOTIFICATION:
      return null
    case SET_MUST_BE_SIGNED_IN_NOTIFICATION:
      if (!action.data.username) {
        if (action.data.event)
          action.data.event.preventDefault() // should be refactored out of the reducer
        return {
            type: MUST_SIGN_IN,
            intendedAction: action.data.intendedAction
          }
      }
      return state
    default:
      return state
  }
}