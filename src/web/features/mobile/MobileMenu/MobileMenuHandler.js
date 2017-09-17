import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import MobileMenu from './MobileMenu.js'
import {goHome, goMyShops} from '../../Menu/MenuActions.js'
import {pullUserInfo, signOut} from '../../UserInfo/UserInfoActions'
import {showSignUp, showLogin} from '../../../scenes/modals/AuthActions'
import {toggleHamburgerMenu} from './MobileMenuActions'

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
      dispatch(push('/'))
    },
    onMyShops: () => {
      dispatch(goMyShops)
      dispatch(push('/shops'))
    },
    onSelectNewPost: () => {
      dispatch(push('/new'))
    },
    onAddAShop: () => {
      dispatch(push('/new_shop'))
    },
    onMyPosts: () => {
      dispatch(push('/posts'))
    },

    //temporarily borrowed from UserInfoHandler
    getUserInfo: () => {
      dispatch(pullUserInfo())
    },
    onShowMobileLogin: () => dispatch(showLogin()),
    onShowMobileSignUp: () => dispatch(showSignUp()),
    signOut: () => {
      dispatch(signOut())
      dispatch(push('/'))
    },
    toggleMenu: () => dispatch(toggleHamburgerMenu())
  }
}

const MobileMenuHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu)

export default MobileMenuHandler