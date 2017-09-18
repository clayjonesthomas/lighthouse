// this should be broken out/refactored
import {SAVE_NEW_POST_FORM_REF}
  from 'scenes/NewPostPage/NewPostActions'

export function formRefs(state = {}, action) {
  switch(action.type) {
    case SAVE_NEW_POST_FORM_REF:
      let ref_obj = {}
      ref_obj[action.data.type] = action.data.ref
      return Object.assign({}, state, ref_obj)
    case ADD_SHOP_FINDER_REF:
      return Object.assign({}, state, {
          shopFinder: action.data.ref
        })
    // icons currently not implemented
    // case ADD_SHOP_ICON_TO_FORM_DATA:
    //   return Object.assign({}, state, {
    //       icon: action.data.icon
    //     })
    default:
      return state
  }
}