import {PULL_LIKED_SHOPS_RETURN, ARCHIVE_POST_RETURN}
  from './TrackedShopActions'


export function trackedShops(state = [], action) {
  switch (action.type) {
    case PULL_LIKED_SHOPS_RETURN:
      return action.data
    case ARCHIVE_POST_RETURN:
      let newState = Object.assign({}, state)
      newState.forEach((shop) => {
        shop.active_posts.forEach((post) => {
          if(post.key === action.data){
            post.title = "archived"
          }
        })
      })
      return newState
    default:
      return state
  }
}
