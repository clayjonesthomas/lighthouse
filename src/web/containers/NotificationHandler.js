import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from '../actions/NotificationActions'
import BaseNotification from '../components/BaseNotification'

const NotificationRoot = (
  {
    notification
  }) => {
  if (!notification) {
    return <span />
  }
    return (
      <BaseNotification
        message={notification.message}
        showSignUp={notification.showSignUp}
        canExit={notification.canExit}
        exitNotification={() =>
          this.props.exitNotification()}
      />
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    exitNotification: () => dispatch(removeNotification())
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