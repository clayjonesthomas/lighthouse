import React, {PropTypes} from 'react'

import "./BaseNotification.css"
const BaseNotification = (
  {
    message,
    showSignUp,
    canExit,
    exitNotification
  }) => (
  <div>
    message
  </div>
)

BaseNotification.propTypes = {
  message: PropTypes.string.isRequired,
  showSignUp: PropTypes.bool,
  canExit: PropTypes.bool,
  exitNotification: PropTypes.func.isRequired
}

export default BaseNotification