import {EMAIL_FREQUENCY_CHANGE, PICKED_SHOPS_CHANGE, 
  UPDATE_SETTINGS_REQUEST, UPDATE_SETTINGS_RETURN, 
  SETTINGS_SPINNER_TIMEOUT, SENT_RESEND_VERIFICATION,
  RESENT_MESSAGE_TIMEOUT}
    from './SettingsPageActions'
import {USER_DATA_RETURN} from '../../services/UserActions'
import {MID_FREQUENCY_EMAIL} from './SettingsPageComponent'

const defaultSettingsState = {
  selectedShops: [],
  emailFrequency: MID_FREQUENCY_EMAIL,
  submitSpinner: false,
  spinnerComplete: true,
  showSavedMessage: false,
  showResentMessage: false
} 

export function settings(state = defaultSettingsState, action) {
  switch (action.type) {
    case USER_DATA_RETURN:
      return Object.assign({}, state, {
        selectedShops: action.data.myShops,
        emailFrequency: action.data.emailFrequency
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
    case SENT_RESEND_VERIFICATION:
      return Object.assign({}, state, {
        showResentMessage: true
      })
    case RESENT_MESSAGE_TIMEOUT:
      return Object.assign({}, state, {
        showResentMessage: false
      })
    default:
      return state
  }
}
