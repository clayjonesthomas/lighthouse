import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import MobileMenu from '../components/MobileMenu.js'
import {goHome, goMyShops} from '../actions/MenuActions.js'
import {pullUserInfo, signOut} from '../features/UserInfo/UserInfoActions'
import {showSignUp, showLogin} from '../features/modals/AuthActions'
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