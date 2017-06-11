import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Menu from '../components/Menu.js'
import {goHome, goMyShops, goProfile} from '../actions/MenuActions.js'

const mapStateToProps = (state) => {
  return state
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
    onProfile: () => {
      dispatch(goProfile())
      browserHistory.push('/profile')
    },
  }
}

const MenuHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuHandler