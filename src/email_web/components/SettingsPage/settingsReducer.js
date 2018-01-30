import {EMAIL_FREQUENCY_CHANGE, PICKED_SHOPS_CHANGE} 
  from './SettingsPageActions'
import {MY_SHOPS_RESPONSE, MY_EMAIL_FREQUENCY_RESPONSE} from '../../services/ShopDataActions'
import {MID_FREQUENCY_EMAIL} from './SettingsPageComponent'

const defaultSettingsState = {
  selectedShops: [],
  emailFrequency: MID_FREQUENCY_EMAIL
} 

export function settings(state = defaultSettingsState, action) {
  switch (action.type) {
    case MY_EMAIL_FREQUENCY_RESPONSE:
      return Object.assign({}, state, {
        emailFrequency: action.data
      })
    case MY_SHOPS_RESPONSE:
      return Object.assign({}, state, {
        selectedShops: action.data
      })
    case EMAIL_FREQUENCY_CHANGE:
      return Object.assign({}, state, {
        emailFrequency: action.data
      })
    case PICKED_SHOPS_CHANGE:
      return Object.assign({}, state, {
        selectedShops: action.data
      })
    default:
      return state
  }
}