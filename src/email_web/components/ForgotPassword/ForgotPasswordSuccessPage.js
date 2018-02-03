import React from 'react'

import "../LogInPage/LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"

export const FORGOT_PASSWORD_SUCCESS_PAGE = 'FORGOT_PASSWORD_SUCCESS_PAGE'

const ForgotPasswordSuccessPage = ({}) => (
  <div
    className="auth-form">
    <div
      className="form-wrapper new-password-success-wrapper">
      <h1 className="form-title">
        Email Sent!
      </h1>
      <p
        id="forgot-password-success-helper-text"
        className="helper-text">
        We've sent a password reset link to the email you entered, if
        it exists. If you don't receive this email,
        please contact&nbsp;
        <a
          href="mailto:info@lightho.us"
          target="_top"
        >
          info@lightho.us
        </a>
      </p>
    </div>
  </div>
)

export default ForgotPasswordSuccessPage
