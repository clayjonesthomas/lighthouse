import React from 'react'

import "../LogInPage/LogInPageComponent.css"
import "../SignUpPage/SignUpPageComponent.css"
import "../LandingPage/LandingPageComponent.css"
import "./NewPasswordSuccessPage.css"

export const NEW_PASSWORD_SUCCESS_PAGE = 'NEW_PASSWORD_SUCCESS_PAGE'

const NewPasswordSuccessPage = ({
                                  goToSettings
                                }) => (
  <div
    className="auth-form">
    <div
      className="form-wrapper new-password-success-wrapper">
      <h1 className="form-title">
        Password update successful!
      </h1>
      <p
        className="helper-text">
        You can close this page now.
      </p>
      <p
        className="helper-text">
        <a onClick={goToSettings} tabIndex="-1">Your Settings</a>
      </p>
    </div>
  </div>
)

export default NewPasswordSuccessPage
