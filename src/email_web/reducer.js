import {SWITCH_PAGES} from './actions'

import {REQUEST_SHOPS_RETURN} from 'scenes/NewPostPage/NewPostActions'
import {REQUEST_MY_SHOPS_RETURN} from 'scenes/MyShopsPage/MyShopsPageActions'

let default_state = {
  page: 1,
  shops: [],
  displayedShops: []
}

export default function reducer(state=default_state, action) {
  switch (action.type) {
    case SWITCH_PAGES:
      let page = 1
      if (state.page === 1) {
        page = 2
      }
      return Object.assign({}, state, {
        page: page
      })
    case REQUEST_SHOPS_RETURN:
      return Object.assign({}, state, {
        shops: action.data.shops
      })
    case REQUEST_MY_SHOPS_RETURN:
      return Object.assign({}, state, {
        displayedShops: action.data.shops
      })
    default:
      return state
  }
}