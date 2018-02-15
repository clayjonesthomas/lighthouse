import {ADMIN_POST_TITLE_CHANGE, ADMIN_PICKED_SHOPS_CHANGE,
ADMIN_IS_IMPORTANT_CHANGE, NEW_POST_RESPONSE}
  from './NewShopActions'

const defaultAdminState = {
  postTitleValue: '',
  selectedShops: [],
  isImportant: false
}

export function admin(state = defaultAdminState, action) {
  switch (action.type) {
    case ADMIN_POST_TITLE_CHANGE:
      return Object.assign({}, state, {
        postTitleValue: action.data
      })
    case ADMIN_PICKED_SHOPS_CHANGE:
      return Object.assign({}, state, {
        selectedShops: action.data
      })
    case ADMIN_IS_IMPORTANT_CHANGE:
      return Object.assign({}, state, {
        isImportant: !state.isImportant
      })
    case NEW_POST_RESPONSE:
      return defaultAdminState
    default:
      return state
  }
}
