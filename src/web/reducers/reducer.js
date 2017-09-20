import {ADD_POST, CANCEL_POST, SAVE_NEW_POST_FORM_REF,
REQUEST_SHOPS, REQUEST_SHOPS_RETURN, UPDATE_FORM_SHOPS}
  from '../scenes/NewPostPage/NewPostActions.js'
import {GO_HOME, GO_MY_SHOPS} from '../features/Menu/MenuActions.js'
import {REQUEST_POSTS, REQUEST_POSTS_RETURN} from '../scenes/FrontPage/FrontPageActions'
import {REQUEST_SINGLE_POST_RETURN} from '../scenes/MyPostsPage/PostPageActions'
import {RESPONSE_LOGIN, SHOW_MODAL, LOGIN, SIGN_UP, INFO, CANCEL}
  from '../scenes/modals/AuthActions.js'
import {REQUEST_USER_INFO, REQUEST_USER_INFO_RETURN} from '../features/UserInfo/UserInfoActions'
import {LIKE_POST, LIKE_POST_RETURN} from '../scenes/MyPostsPage/PostPageActions'
import {REQUEST_SHOP, REQUEST_SHOP_RETURN} from '../scenes/ShopPage/ShopPageActions'
import {LIKE_SHOP, LIKE_SHOP_RETURN} from '../scenes/ShopPage/ShopPageActions'
import {REQUEST_MY_SHOPS, REQUEST_MY_SHOPS_RETURN,
  ADD_SHOPS_TO_MY_SHOPS_REQUEST, ADD_SHOPS_TO_MY_SHOPS_RETURN, ADD_SHOP_FINDER_REF}
  from '../scenes/MyShopsPage/MyShopsPageActions'
import {SIGN_OUT_REQUEST, SIGN_OUT_RESPONSE} from '../features/UserInfo/UserInfoActions'
import {ADD_SHOP_ICON_TO_FORM_DATA} from '../scenes/NewShopPage/NewShopActions'
import {MORE_POSTS_REQUEST, MORE_POSTS_RETURN} from '../scenes/FrontPage/FrontPageActions'
import {SHOP_POSTS_REQUEST, SHOP_POSTS_RETURN} from '../scenes/ShopPage/ShopPageActions'
import {MORE_SHOP_POSTS_REQUEST, MORE_SHOP_POSTS_RETURN} from '../scenes/ShopPage/ShopPageActions'
import {MY_POSTS_REQUEST, MY_POSTS_RESPONSE} from '../scenes/MyPostsPage/MyPostsPageActions'
import {MORE_MY_POSTS_REQUEST, MORE_MY_POSTS_RESPONSE} from '../scenes/MyPostsPage/MyPostsPageActions'
import {IS_USER_MOBILE} from '../features/UserInfo/UserActions'
import {TOGGLE_HAMBURGER_MENU} from '../features/mobile/MobileMenu/MobileMenuActions'
import {SIGN_UP_REQUEST, SIGN_UP_RESPONSE} from '../scenes/modals/AuthActions'
import {LOGIN_RESPONSE_FAILED, SIGN_UP_RESPONSE_FAILED, CLEAR_ERROR_MESSAGE,
  DUPLICATE_USERNAME_ERROR, AUTHENTICATION_ERROR}
  from '../scenes/modals/AuthActions'
import {ADD_POST_FAILURE, ADD_POST_RETURN, VALIDATION_ERROR} from '../scenes/NewPostPage/NewPostActions'
import {SET_NOTIFICATION, REMOVE_NOTIFICATION,
  SET_MUST_BE_SIGNED_IN_NOTIFICATION, MUST_SIGN_IN}
  from "../scenes/notifications/NotificationActions"
import {ARCHIVE_POST_RETURN} from '../scenes/MyPostsPage/PostPageActions'

const initialState = {
    displayedPosts: [],
    displayedShops: [],
    shops: [],
    modal: null,
    username: null,
    shop: {},
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
    serverMessageArray: [],
    notification: null
}


function store(state = initialState, action) {
  let serverMessageArray = []
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
        case INFO:
          return Object.assign({}, state, {
            modal: INFO,
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
        shop: action.data.shop
      })
    case GO_MY_SHOPS:
    case GO_HOME:
    case ADD_POST:
    case CANCEL_POST:
      return state
    case RESPONSE_LOGIN:
      window.location.reload()
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
          if(post.key === action.data.post_key) {
            post.likes += post.isLiked ? -1 : 1
            post.isLiked = !post.isLiked
          }
          return post
        })
      })
    case LIKE_POST_RETURN:
      return state
    case REQUEST_SHOP:
      return state
    case REQUEST_SHOP_RETURN:
      return Object.assign({}, state, {
        shop: action.data.shop
      })
    case LIKE_SHOP:
      let newState = Object.assign({}, state, {
        displayedShops: state.displayedShops.map(shop => {
          if(shop.key === action.data.shop_key) {
            shop.likes += shop.isLiked ? -1 : 1
            shop.isLiked = !shop.isLiked
          }
          return shop
        })
      })
      if(state.shop) //hack because of overloaded toggleShopLike
        newState.shop = Object.assign({}, state.shop, {
          likes: state.shop.likes += state.shop.isLiked ? -1 : 1,
          isLiked: !state.shop.isLiked
        })
      return newState
    case LIKE_SHOP_RETURN:
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
        username: null,
        isModerator: false
      })
    case SIGN_OUT_RESPONSE:
      return Object.assign({}, state, {
        isUserInfoLoaded: true
      })
    case ADD_SHOP_ICON_TO_FORM_DATA:
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
      return Object.assign({}, state, {
        isMobile: action.data.isUserMobile
      })
    case TOGGLE_HAMBURGER_MENU:
      return Object.assign({}, state, {
        displayHamburgerMenu: !state.displayHamburgerMenu
      })
    case SIGN_UP_RESPONSE:
      window.location.reload()
      return Object.assign({}, state, {
        modal: null,
        username: action.data.username
      })
    case SIGN_UP_RESPONSE_FAILED:
      switch (action.data.error.error) {
        case VALIDATION_ERROR:
          if (!action.data.error.isUsernamePresent) {
            serverMessageArray.push("you must enter a username")
          }
          if (!action.data.error.isEmailPresent) {
            serverMessageArray.push("you must enter an email")
          } else if (!action.data.error.isEmailValid) {
            serverMessageArray.push("you must enter a valid email")
          }
          if (!action.data.error.isPasswordPresent) {
            serverMessageArray.push("you must enter a password")
          }
          break
        case DUPLICATE_USERNAME_ERROR:
          serverMessageArray.push("the username is already taken," +
            " please select another")
          break
      }
      return Object.assign({}, state, {
        serverMessageArray: serverMessageArray
      })
    case LOGIN_RESPONSE_FAILED:
      switch (action.data.error.error) {
        case VALIDATION_ERROR:
          if (!action.data.error.isUsernamePresent) {
            serverMessageArray.push("you must enter a username")
          }
          if (!action.data.error.isPasswordPresent) {
            serverMessageArray.push("you must enter a password")
          }
          break
        case AUTHENTICATION_ERROR:
          serverMessageArray.push("The username or password was " +
            "entered incorrectly.")
          break
      }
      return Object.assign({}, state, {
        serverMessageArray: serverMessageArray
      })
    case CLEAR_ERROR_MESSAGE:
      return Object.assign({}, state, {
        serverMessageArray: []
      })
    case ADD_POST_RETURN:
      if (action.data.error) {
        switch (action.data.error) {
          case VALIDATION_ERROR:
          default:
            if (action.data.isShopsValid) {
              serverMessageArray.push("please make sure " +
                "you have added at least one valid shop")
            }
            if (action.data.isTitleValid) {
              serverMessageArray.push("please make sure " +
                "you have added a title")
            }
        }
      }
      return Object.assign({}, state, {
        serverMessageArray: serverMessageArray
      })
    case ADD_POST_FAILURE:
      if (action.data.messages.noShopsError) {
        serverMessageArray.push("You need to add at least one shop")
      }
      if (action.data.messages.noTitleError) {
        serverMessageArray.push("You need to give the post a descriptive title")
      }
      return Object.assign({}, state, {
        serverMessageArray: serverMessageArray
      })
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          type: action.data.notification
        }
      })
    case REMOVE_NOTIFICATION:
      return Object.assign({}, state, {
        notification: null
      })
    case SET_MUST_BE_SIGNED_IN_NOTIFICATION:
      if (!state.username) {
        if (action.data.event)
          action.data.event.preventDefault()
        return Object.assign({}, state, {
          notification: {
            type: MUST_SIGN_IN,
            intendedAction: action.data.intendedAction
          }
        })
      }
      return state
    case ARCHIVE_POST_RETURN:
      if (action.data.isArchived) {
        let indexOfArchivedObject = state.displayedPosts
          .findIndex(post => post.key === action.data.postKey)
        let newDisplayedPosts = state.displayedPosts.slice()
        newDisplayedPosts.splice(indexOfArchivedObject, 1)
        return Object.assign({}, state, {
          displayedPosts: newDisplayedPosts
        })
      }
      return state
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
