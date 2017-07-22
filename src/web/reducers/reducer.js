import {ADD_POST, CANCEL_POST, SAVE_NEW_POST_FORM_REF,
REQUEST_SHOPS, REQUEST_SHOPS_RETURN, UPDATE_FORM_SHOPS}
from '../actions/NewPostActions.js'
import {GO_HOME, GO_MY_SHOPS} from '../actions/MenuActions.js'
import {REQUEST_POSTS, REQUEST_POSTS_RETURN} from '../actions/FrontPageActions'
import {REQUEST_SINGLE_POST_RETURN} from '../actions/PostPageActions'
import {RESPONSE_LOGIN, SHOW_MODAL, LOGIN, SIGN_UP, CANCEL}
  from '../actions/AuthActions.js'
import {REQUEST_USER_INFO, REQUEST_USER_INFO_RETURN} from '../actions/UserInfoActions'
import {LIKE_POST, LIKE_POST_RETURN} from '../actions/PostPageActions'
import {REQUEST_STORE, REQUEST_STORE_RETURN} from '../actions/StorePageActions'
import {LIKE_STORE, LIKE_STORE_RETURN} from '../actions/StorePageActions'
import {REQUEST_MY_SHOPS, REQUEST_MY_SHOPS_RETURN} from '../actions/MyShopsPageActions'

const initialState = {
  displayedPosts: [],
  displayedShops: [],
  shops: [],
  jwt: null,
  modal: null,
  username: null,
  store: {},
  isUserInfoLoaded: false,
  arePostsLoaded: false,
  areMyShopsLoaded: false,
  areShopsLoaded: false,
  formRefs: {},
  form: {}
}


function lighthouse(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      switch (action.meta) {
        default:
        case CANCEL:
          return Object.assign({}, state, {
            modal: null,
          })
        case SIGN_UP:
          return Object.assign({}, state, {
            modal: SIGN_UP,
          })
        case LOGIN:
          return Object.assign({}, state, {
            modal: LOGIN,
          })
      }
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        arePostsLoaded: false,
      })
    case REQUEST_POSTS_RETURN:
      if(action.data.posts)
        return Object.assign({}, state, {
          displayedPosts: action.data.posts,
          arePostsLoaded: true
        })
      return state
    case REQUEST_SINGLE_POST_RETURN:
      return Object.assign({}, state, {
        title: action.data.title,
        likes: action.data.likes,
        timestamp: action.data.timestamp,
        author: action.data.author,
        store: action.data.store
      })
    case GO_MY_SHOPS:
    case GO_HOME:
    case ADD_POST:
    case CANCEL_POST:
      return state
    case RESPONSE_LOGIN:
      return Object.assign({}, state, {
        modal: null,
        username: action.data.username
      })
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        isUserInfoLoaded: false
      })
    case REQUEST_USER_INFO_RETURN:
      return Object.assign({}, state, {
        username: action.data.username,
        isUserInfoLoaded: true
      })
    case LIKE_POST:
      return Object.assign({}, state, {
        displayedPosts: state.displayedPosts.map(post => {
          if(post.key === action.data.post_key)
            post.isLiked = !post.isLiked
          return post
        })
      })
    case LIKE_POST_RETURN:
      return state
    case REQUEST_STORE:
      return state
    case REQUEST_STORE_RETURN:
      return Object.assign({}, state, {
        store: action.data.store
      })
    case LIKE_STORE:
      return Object.assign({}, state, {
        store: Object.assign({}, state.store, {
          isLiked: !state.store.isLiked
        })
      })
    case LIKE_STORE_RETURN:
      return state
    case REQUEST_MY_SHOPS:
      return Object.assign({}, state, {
        areMyShopsLoaded: false
      })
    case REQUEST_MY_SHOPS_RETURN:
      if(action.data.shops)
        return Object.assign({}, state, {
          displayedShops: action.data.shops,
          areMyShopsLoaded: true
        })
      return state
    case SAVE_NEW_POST_FORM_REF:
      let ref_obj = {}
      ref_obj[action.data.type] = action.data.ref
      return Object.assign({}, state, {
        formRefs: Object.assign({}, state.formRefs, ref_obj)
      })
    case REQUEST_SHOPS:
      return Object.assign({}, state, {
        areShopsLoaded: false
      })
    case REQUEST_SHOPS_RETURN:
      return Object.assign({}, state, {
        areShopsLoaded: true,
        shops: action.data.shops
      })
    case UPDATE_FORM_SHOPS:
      return Object.assign({}, state, {
        form: {
          shops: action.data.shops
        }
      })
    default:
      return state
  }
}

export default lighthouse