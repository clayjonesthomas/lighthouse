import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from '../actions/NotificationActions'
import MustSignInNotification
  from '../components/MustSignInNotification'
import {showSignUp} from '../actions/AuthActions'

const NotificationRoot = (
  {
    notificationType,
    onSignUp,
    exitNotification
  }) => {
  if (!notificationType) {
    return <span />
  }
    return (
      <MustSignInNotification
        onSignUp={onSignUp}
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
    notificationType: state.notificationType
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationRoot)