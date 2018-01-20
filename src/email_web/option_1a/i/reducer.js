import {SWITCH_PAGES} from './actions'

let default_state = {
  page: 1
}

export default function reducer(state=default_state, action) {
  switch (action.type) {
    case SWITCH_PAGES:
      let page = 1
      if(state.page === 1){
        page = 2
      }
      return Object.assign({}, state, {
        page: page
      })
    default:
      return state
  }
}