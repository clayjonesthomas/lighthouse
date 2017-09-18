import { combineReducers } from 'redux'
import {displayedShops, shops, areMyShopsLoaded,
  areShopsLoaded} from './ShopsReducer'
import {shop, shopPostsOffset} from './SHopReducer'

export default combineReducers({
  displayedShops,
  shops,
  areMyShopsLoaded,
  areShopsLoaded,
  shop,
  shopPostsOffset,
})