import React, {PropTypes} from 'react'
import LinkButton from '../components/ui-kit/LinkButton'
import XGraphic from '../components/ui-kit/XGraphic'

import "./MustSignInNotification.css"
const MustSignInNotification = (
  {
    onSignUp,
    exitNotification
  }) => (
  <div className="base-notification">
    <LinkButton
      className="notification-link"
      onClick={onSignUp}
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
        "to use this feature"
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
  exitNotification: PropTypes.func.isRequired
}

export default MustSignInNotification