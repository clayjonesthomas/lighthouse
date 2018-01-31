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
        className="helper-text">
        If an account exists for the email you entered,
        we have sent an email with instructions for how to
        reset your password. If you don't receive this email,
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
