import {} from './SettingsPageActions'

import {MY_SHOPS_RESPONSE}
  from '../../services/ShopDataActions'

export function myShops(state = [], action) {
  switch (action.type) {
    case MY_SHOPS_RESPONSE:
      return action.data
    default:
      return state
  }
}

export function settins(state =  defaultSettingsState, action) {
  switch (action.type) {
    
  }
}