import React, {PropTypes} from 'react'
import LinkButton from '../components/ui-kit/LinkButton'
import XGraphic from '../components/ui-kit/XGraphic'

import "./BaseNotification.css"
const BaseNotification = (
  {
    message,
    onSignUp,
    canExit,
    exitNotification
  }) => (
  <div className="base-notification">
    <LinkButton
      className="notification-link"
      onClick={onSignUp}
      contents="Sign up"
    />
    <div className="notification-message">
      {
        "to use this feature"
      }
    </div>
    {canExit &&
      <XGraphic
        className="notification-x"
        color="#fcfcfc"
        onClick={exitNotification}
        width="20"
        height="20"
      />
    }
  </div>
)

BaseNotification.propTypes = {
  message: PropTypes.string.isRequired,
  showSignUp: PropTypes.bool,
  canExit: PropTypes.bool,
  exitNotification: PropTypes.func.isRequired
}

export default BaseNotification