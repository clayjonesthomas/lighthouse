import {connect} from 'react-redux'
import Menu from './Menu.js'
import {setMustBeSignedInNotification}
  from '../../scenes/notifications/NotificationActions'

const mapStateToProps = (state) => {
  return {
    username: state.username,
    isModerator: state.isModerator
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMustBeSignedInNotification: (e) => {
      dispatch(setMustBeSignedInNotification(e))
    }
  }
}

const MenuHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuHandler