import React, {PropTypes} from 'react'

import "./ErrorMessages.css"
const ErrorMessages = (
  {
    className,
    messages
  }) => (
    <div className={'error-message-container ' + className}>
      <ul>
        {
          messages.map(message => {
            return <li className="error-message-li">
              {message}
              </li>
          })
        }
      </ul>
    </div>
)

ErrorMessages.propTypes = {
  onClick: PropTypes.func
}

export default ErrorMessages