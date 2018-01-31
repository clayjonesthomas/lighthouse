import React, {PropTypes} from 'react'

import "./VerificationSuccessPageComponent.css"
const VerificationSuccessPageComponent =
  ({}) => (
  <div 
    className="form-wrapper"
    id="verification-form-wrapper"
  >
    <h1>Your account has been verified!</h1>
    <p className="helper-text">Redirecting you to your settings page...</p>
  </div>
)

VerificationSuccessPageComponent.propTypes = {}

export default VerificationSuccessPageComponent