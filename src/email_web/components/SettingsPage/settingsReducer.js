import {EMAIL_FREQUENCY_CHANGE, PICKED_SHOPS_CHANGE, 
  UPDATE_SETTINGS_REQUEST, UPDATE_SETTINGS_RETURN, SETTINGS_SPINNER_TIMEOUT} 
    from './SettingsPageActions'
import {MY_SHOPS_RESPONSE, MY_EMAIL_FREQUENCY_RESPONSE} from '../../services/ShopDataActions'
import {MID_FREQUENCY_EMAIL} from './SettingsPageComponent'

const defaultSettingsState = {
  myPreviousShops: [],
  selectedShops: [],
  myPreviousEmailFrequency: MID_FREQUENCY_EMAIL,
  emailFrequency: MID_FREQUENCY_EMAIL,
  submitSpinner: false,
  spinnerComplete: true,
  showSavedMessage: false
} 

export function settings(state = defaultSettingsState, action) {
  switch (action.type) {
    case MY_EMAIL_FREQUENCY_RESPONSE:
      return Object.assign({}, state, {
        myPreviousEmailFrequency: action.data,
        emailFrequency: action.data
      })
    case MY_SHOPS_RESPONSE:
      return Object.assign({}, state, {
        myPreviousShops: action.data,
        selectedShops: action.data
      })
    case EMAIL_FREQUENCY_CHANGE:
      return Object.assign({}, state, {
        emailFrequency: action.data,
        showSavedMessage: false
      })
    case PICKED_SHOPS_CHANGE:
      return Object.assign({}, state, {
        selectedShops: action.data,
        showSavedMessage: false
      })
    case UPDATE_SETTINGS_REQUEST:
      return Object.assign({}, state, {
        submitSpinner: true,
        spinnerComplete: false,
        showSavedMessage: false
      })
    case UPDATE_SETTINGS_RETURN:
      return Object.assign({}, state, {
        submitSpinner: false,
        showSavedMessage: true
      })
    case SETTINGS_SPINNER_TIMEOUT:
      return Object.assign({}, state, {
        submitSpinner: false,
        spinnerComplete: true,
        showSavedMessage: true
      })
    default:
      return state
  }
}
