export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const SET_MUST_BE_SIGNED_IN_NOTIFICATION =
  "SET_MUST_BE_SIGNED_IN_NOTIFICATION"
export const MUST_SIGN_IN = "MUST_SIGN_IN"

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export const setNotification = (notificationType) => {
  return {
    type: SET_NOTIFICATION,
    data: {
      notificationType: notificationType
    }
  }
}

export function setMustBeSignedInNotification(e, action) {
  return (dispatch, getState) =>{
    const state = getState()
    return {
      type: SET_MUST_BE_SIGNED_IN_NOTIFICATION,
      data: {
        event: e,
        intendedAction: action,
        username: state.username
      }
    }
  }
}