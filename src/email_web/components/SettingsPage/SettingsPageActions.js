import {UPDATE_SETTINGS_URL, USER_DATA_URL} from '../../urls'
import {pullMyShops} from '../../services/ShopDataActions'

export const EMAIL_FREQUENCY_CHANGE = 'EMAIL_FREQUENCY_CHANGE'
export const PICKED_SHOPS_CHANGE = 'PICKED_SHOPS_CHANGE'
export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST'
export const UPDATE_SETTINGS_RETURN = 'UPDATE_SETTINGS_RETURN'
export const SETTINGS_SPINNER_TIMEOUT = 'SETTINGS_SPINNER_TIMEOUT'
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST'
export const USER_DATA_RETURN = 'USER_DATA_RETURN'

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

export const updateSettingsReturn = (success) => {
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
      .then(() => dispatch(pullMyShops()))
      .then(() => dispatch(pullUserData()))
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

export const userDataRequest = () => {
  return {
    type: USER_DATA_REQUEST
  }
}

export const userDataReturn = (userData) => {
  return {
    type: USER_DATA_RETURN,
    data: userData
  }
}

export function pullUserData() {
  const args = {
    method: 'GET',
    credentials: 'same-origin',
  }
  return dispatch => {
    dispatch(userDataRequest())
    return fetch(USER_DATA_URL, args)
      .then(response => response.json())
      .then(json => dispatch(userDataReturn(json)))
  }
}
