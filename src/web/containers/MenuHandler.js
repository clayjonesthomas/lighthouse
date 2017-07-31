import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Menu from '../components/Menu.js'
import {goHome, goMyShops} from '../actions/MenuActions.js'

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isModerator: state.isModerator
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
    }
  }
}

const MenuHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuHandler