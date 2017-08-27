import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from '../actions/NotificationActions'
import MustSignInNotification
  from '../components/MustSignInNotification'
import {showSignUp, showLogin} from '../actions/AuthActions'

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