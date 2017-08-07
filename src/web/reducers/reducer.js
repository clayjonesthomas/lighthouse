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
import {REQUEST_MY_SHOPS, REQUEST_MY_SHOPS_RETURN,
  ADD_SHOPS_TO_MY_SHOPS_REQUEST, ADD_SHOPS_TO_MY_SHOPS_RETURN, ADD_SHOP_FINDER_REF}
  from '../actions/MyShopsPageActions'
import {SIGN_OUT_REQUEST, SIGN_OUT_RESPONSE} from '../actions/UserInfoActions'
import {ADD_STORE_ICON_TO_FORM_DATA} from '../actions/NewStoreActions'
import {MORE_POSTS_REQUEST, MORE_POSTS_RETURN} from '../actions/FrontPageActions'
import {SHOP_POSTS_REQUEST, SHOP_POSTS_RETURN} from '../actions/StorePageActions'
import {MORE_SHOP_POSTS_REQUEST, MORE_SHOP_POSTS_RETURN} from '../actions/StorePageActions'
import {MY_POSTS_REQUEST, MY_POSTS_RESPONSE} from '../actions/MyPostsPageActions'
import {MORE_MY_POSTS_REQUEST, MORE_MY_POSTS_RESPONSE} from '../actions/MyPostsPageActions'
import {IS_USER_MOBILE} from '../actions/UserActions'
import {TOGGLE_HAMBURGER_MENU} from '../actions/MobileMenuActions'
import {SIGN_UP_REQUEST, SIGN_UP_RESPONSE} from '../actions/AuthActions'

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
  form: {},
  isModerator: false,
  postsOffset: 0,
  areMorePostsLoaded: true,
  areMorePosts: true,
  shopPostsOffset: 0,
  isMobile: false,
  displayHamburgerMenu: false,
  authRefs: {}
}


function store(state = initialState, action) {
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
        postsOffset: 10,
        areMorePosts: true
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
        isModerator: action.data.isModerator,
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
      let newState = Object.assign({}, state, {
        displayedShops: state.displayedShops.map(shop => {
          if(shop.key === action.data.store_key)
            shop.isLiked = !shop.isLiked
          return shop
        })
      })
      if(state.store) //hack because of overloaded toggleStoreLike
        newState.store = Object.assign({}, state.store, {
          isLiked: !state.store.isLiked
        })
      return newState
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
    case ADD_SHOPS_TO_MY_SHOPS_REQUEST:
      return state
    case ADD_SHOPS_TO_MY_SHOPS_RETURN:
      return Object.assign({}, state, {
        displayedShops: state.displayedShops.concat(action.data.shopsToAdd)
      })
    case ADD_SHOP_FINDER_REF:
      return Object.assign({}, state, {
        formRefs: Object.assign({}, state.formRefs, {
          shopFinder: action.data.ref
        })
      })
    case SIGN_OUT_REQUEST:
      return Object.assign({}, state, {
        username: null
      })
    case SIGN_OUT_RESPONSE:
      return state
    case ADD_STORE_ICON_TO_FORM_DATA:
      return Object.assign({}, state, {
        formRefs: Object.assign({}, state.formRefs, {
          icon: action.data.icon
        })
      })
    case MORE_POSTS_REQUEST:
      return Object.assign({}, state, {
        areMorePostsLoaded: false
      })
    case MORE_POSTS_RETURN:
      let newPosts = getUniquePosts(action.data.posts, state.displayedPosts)
      return Object.assign({}, state, {
        areMorePostsLoaded: true,
        postsOffset: state.postsOffset+10,
        displayedPosts: state.displayedPosts.concat(newPosts),
        areMorePosts: action.data.posts.length === 10
      })
    case SHOP_POSTS_REQUEST:
      return Object.assign({}, state, {
        arePostsLoaded: false,
        areMorePosts: true
      })
    case SHOP_POSTS_RETURN:
      return Object.assign({}, state, {
        arePostsLoaded: true,
        displayedPosts: action.data.shopPosts,
        shopPostsOffset: 10
      })
    case MORE_SHOP_POSTS_REQUEST:
      return Object.assign({}, state, {
        areMorePostsLoaded: false
      })
    case MORE_SHOP_POSTS_RETURN:
      let newShopPosts = getUniquePosts(action.data.shopPosts, state.displayedPosts)
      return Object.assign({}, state, {
        areMorePostsLoaded: true,
        displayedPosts: state.displayedPosts.concat(newShopPosts),
        shopPostsOffset: state.shopPostsOffset+10,
        areMorePosts: newShopPosts.length === 10
      })
    case MY_POSTS_REQUEST:
      return Object.assign({}, state, {
        arePostsLoaded: false,
        areMorePosts: true
      })
    case MY_POSTS_RESPONSE:
      return Object.assign({}, state, {
        arePostsLoaded: true,
        postsOffset: 10,
        displayedPosts: action.data.posts
      })
    case MORE_MY_POSTS_REQUEST:
      return Object.assign({}, state, {
        areMorePostsLoaded: false
      })
    case MORE_MY_POSTS_RESPONSE:
      let newMyPosts = getUniquePosts(action.data.posts, state.displayedPosts)
      return Object.assign({}, state, {
        areMorePostsLoaded: true,
        postsOffset: state.postsOffset+10,
        displayedPosts: state.displayedPosts.concat(newMyPosts),
        areMorePosts: action.data.posts.length === 10
      })
    case IS_USER_MOBILE:
      console.log(action.data.isUserMobile)
      return Object.assign({}, state, {
        isMobile: action.data.isUserMobile
      })
    case TOGGLE_HAMBURGER_MENU:
      return Object.assign({}, state, {
        displayHamburgerMenu: !state.displayHamburgerMenu
      })
    case SIGN_UP_RESPONSE:
      return Object.assign({}, state, {
        username: action.data.username
      })
    default:
      return state
  }
}

function getUniquePosts(newPosts, oldPosts){
  let uniquePosts = []
  newPosts.forEach(newPost => {
    let addToPosts = true

    oldPosts.forEach(oldPost => {
      if(newPost.key === oldPost.key) {
        addToPosts = false
      }
    })

    if(addToPosts)
      uniquePosts.push(newPost)
  })
  return uniquePosts
}

export default store