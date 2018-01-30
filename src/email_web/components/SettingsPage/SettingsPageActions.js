import {UPDATE_SETTINGS_URL} from '../../urls'

export const EMAIL_FREQUENCY_CHANGE = 'EMAIL_FREQUENCY_CHANGE'
export const PICKED_SHOPS_CHANGE = 'PICKED_SHOPS_CHANGE'
export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST'
export const UPDATE_SETTINGS_RETURN = 'UPDATE_SETTINGS_RETURN'

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

export const requestUpdateSettings = () => {
  return {
    type: UPDATE_SETTINGS_REQUEST
  }
}

export const requestUpdateSettingsReturn = (rename) => {
  console.log(rename) //TODO do something with these actions
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

    dispatch(requestUpdateSettings())
    return fetch(UPDATE_SETTINGS_URL, args)
      .then(response => response.json())
      .then(json => dispatch(requestUpdateSettingsReturn(json)))
  } 
}