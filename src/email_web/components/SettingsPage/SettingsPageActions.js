import {UPDATE_SETTINGS_URL, RESEND_VERIFICATION_URL} from '../../urls'
import {pullUserData} from '../../services/UserActions'

export const EMAIL_FREQUENCY_CHANGE = 'EMAIL_FREQUENCY_CHANGE'
export const PICKED_SHOPS_CHANGE = 'PICKED_SHOPS_CHANGE'
export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST'
export const UPDATE_SETTINGS_RETURN = 'UPDATE_SETTINGS_RETURN'
export const SETTINGS_SPINNER_TIMEOUT = 'SETTINGS_SPINNER_TIMEOUT'
export const SENT_RESEND_VERIFICATION = 'SENT_RESEND_VERIFICATION'
export const RESENT_MESSAGE_TIMEOUT = 'RESENT_MESSAGE_TIMEOUT'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

export const closeNotification = () => {
  return {
    type: CLOSE_NOTIFICATION
  }
}

export const emailFrequencyChange = (value) => {
  return {
    type: EMAIL_FREQUENCY_CHANGE,
    data: value
  }
}

export const pickedShopsChange = (listOfShops) => {
  return {
    type: PICKED_SHOPS_CHANGE,
    data: listOfShops
  }
}

export const updateSettingsRequest = () => {
  return {
    type: UPDATE_SETTINGS_REQUEST
  }
}

export const updateSettingsReturn = () => {
  return {
    type: UPDATE_SETTINGS_RETURN
  }
}

export const submitSettingsForm = () => {
  return (dispatch, getState) => {
    const state = getState()
    const selectedShops = state.settings.selectedShops
    const emailFrequency = state.settings.emailFrequency
    
    const args = {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        selectedShops: selectedShops,
        emailFrequency: emailFrequency
      })
    }

    dispatch(updateSettingsRequest())
    dispatch(startDummySpinnerTimer())
    return fetch(UPDATE_SETTINGS_URL, args)
      .then(response => response.json())
      .then(json => dispatch(updateSettingsReturn(json)))
      .then(() => {
        dispatch(pullUserData())
      })
  } 
}

export function startDummySpinnerTimer() {
  const SPINNER_MIN_DURATION = 1000 //ms
  return dispatch => {
    return setTimeout(function() {
      dispatch(settingsSpinnerTimeout());
    }, SPINNER_MIN_DURATION);

  }
}

const settingsSpinnerTimeout = () => {
  return {
    type: SETTINGS_SPINNER_TIMEOUT
  }
}

export function resendVerificationEmail() {
  return (dispatch) => {
    const args = {
      method: 'POST',
      credentials: 'same-origin'
    }

    return fetch(RESEND_VERIFICATION_URL, args)
      .then(response => response.json())
      .then(() => {
        dispatch(sentResendVerification())
      })
      .then(() => {
        const DISPLAY_RESENT_MESSAGE_TIME = 3000;
        setTimeout(() => {
          dispatch(resentMessageTimeout());
        }, DISPLAY_RESENT_MESSAGE_TIME)
      })
  }
}

const sentResendVerification = () => {
  return {
    type: SENT_RESEND_VERIFICATION
  }
}

const resentMessageTimeout = () => {
  return {
    type: RESENT_MESSAGE_TIMEOUT
  }
}

