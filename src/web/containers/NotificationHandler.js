import React from 'react'
import {connect} from 'react-redux'
import {removeNotification} from '../actions/NotificationActions'
import MustSignInNotification
  from '../components/MustSignInNotification'
import {showSignUp, showLogin} from '../actions/AuthActions'

const NotificationRoot = (
  {
    notificationType,
    onSignUp,
    onLogin,
    exitNotification
  }) => {
  if (!notificationType) {
    return <span />
  }
    return (
      <MustSignInNotification
        onSignUp={onSignUp}
        onLogin={onLogin}
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
    notificationType: state.notificationType
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationRoot)