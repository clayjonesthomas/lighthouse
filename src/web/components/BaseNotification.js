import React, {PropTypes} from 'react'
import SubmitButton from '../components/ui-kit/SubmitButton'

import "./BaseNotification.css"
const BaseNotification = (
  {
    message,
    showSignUpButton,
    onSignUp,
    canExit,
    exitNotification
  }) => (
  <div className="base-notification">
    <div className="notification-message">
      {
        message
      }
    </div>
    {showSignUpButton &&
      <SubmitButton
        className="notification-sign-up-button"
        contents="SIGN UP"
        onClick={onSignUp}
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