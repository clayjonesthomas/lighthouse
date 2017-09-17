import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from './NotificationActions'
import MustSignInNotification
  from './MustSignInNotification'
import {showSignUp, showLogin} from '../modals/AuthActions'

const NotificationRoot = (
  {
    notification,
    onSignUp,
    onLogin,
    exitNotification
  }) => {
  if (!notification) {
    return <span />
  }
    return (
      <MustSignInNotification
        onSignUp={onSignUp}
        onLogin={onLogin}
        intendedAction={notification.intendedAction}
        exitNotification={() =>
          exitNotification()}
      />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    exitNotification: () => dispatch(removeNotification()),
    onSignUp: () => dispatch(showSignUp()),
    onLogin: () => dispatch(showLogin())
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationRoot)