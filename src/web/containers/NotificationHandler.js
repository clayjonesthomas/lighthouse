import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from '../actions/NotificationActions'
import BaseNotification from '../components/BaseNotification'
import {showSignUp} from '../actions/AuthActions'

const NotificationRoot = (
  {
    notification,
    onSignUp,
    exitNotification
  }) => {
  if (!notification) {
    return <span />
  }
    return (
      <BaseNotification
        message={notification.message}
        showSignUpButton={notification.showSignUp}
        onSignUp={onSignUp}
        canExit={notification.canExit}
        exitNotification={() =>
          exitNotification()}
      />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    exitNotification: () => dispatch(removeNotification()),
    onSignUp: () => dispatch(showSignUp())
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