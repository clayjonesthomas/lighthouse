export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const SET_MUST_BE_SIGNED_IN_NOTIFICATION =
  "SET_MUST_BE_SIGNED_IN_NOTIFICATION"

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export const setNotification = (notification) => {
  return {
    type: SET_NOTIFICATION,
    data: {
      notification: notification
    }
  }
}

export const setMustBeSignedInNotification = (e) => {
  return {
    type: SET_MUST_BE_SIGNED_IN_NOTIFICATION,
    data: {
      event: e
    }
  }
}