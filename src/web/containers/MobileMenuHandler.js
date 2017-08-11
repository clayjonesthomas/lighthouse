import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import MobileMenu from '../components/MobileMenu.js'
import {goHome, goMyShops} from '../actions/MenuActions.js'
import {pullUserInfo, signOut} from '../actions/UserInfoActions'
import {showSignUp, showLogin} from '../actions/AuthActions'
import {toggleHamburgerMenu} from '../actions/MobileMenuActions'

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isModerator: state.isModerator,
    isHamburgerMenuDisplayed: state.displayHamburgerMenu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHome: () => {
      dispatch(goHome())
      browserHistory.push('/')
    },
    onMyShops: () => {
      dispatch(goMyShops)
      browserHistory.push('/shops')
    },
    onSelectNewPost: () => {
      browserHistory.push('/new')
    },
    onAddAShop: () => {
      browserHistory.push('/new_shop')
    },
    onMyPosts: () => {
      browserHistory.push('/posts')
    },

    //temporarily borrowed from UserInfoHandler
    getUserInfo: () => {
      dispatch(pullUserInfo())
    },
    onShowMobileLogin: () => dispatch(showLogin()),
    onShowMobileSignUp: () => dispatch(showSignUp()),
    signOut: () => {
      dispatch(signOut())
      browserHistory.push('/')
    },
    toggleMenu: () => dispatch(toggleHamburgerMenu())
  }
}

const MobileMenuHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu)

export default MobileMenuHandler