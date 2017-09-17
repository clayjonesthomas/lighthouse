import React, {PropTypes} from 'react'
import LinkButton from 'ui-kit/LinkButton'
import XGraphic from 'ui-kit/XGraphic'

import "./MustSignInNotification.css"
const MustSignInNotification = (
  {
    onSignUp,
    onLogin,
    intendedAction,
    exitNotification
  }) => (
  <div className="base-notification">
    <LinkButton
      className="notification-link"
      onClick={onLogin}
      contents="Log in"
    />
    <div className="notification-message">
      {"or"}
    </div>
    <LinkButton
      className="notification-link"
      onClick={onSignUp}
      contents="sign up"
    />
    <div className="notification-message">
      {
        (intendedAction || "to use this feature")
      }
    </div>
    <XGraphic
      className="notification-x"
      color="#fcfcfc"
      onClick={exitNotification}
      width="20"
      height="20"
    />
  </div>
)

MustSignInNotification.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  exitNotification: PropTypes.func.isRequired,
  intendedAction: PropTypes.string
}

export default MustSignInNotification