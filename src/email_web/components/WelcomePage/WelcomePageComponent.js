import React from 'react'

import "./WelcomePage.css"
const WelcomePageComponent = ({
                                goToSettings
                              }) => (
  <div id="welcome-page">
    <h1>
      Welcome to&nbsp;
      <span
        id="title-logo"
      >
        lightho.us
      </span>
      !
    </h1>
    <p
      id="welcome-paragraph">
      Check your inbox for an welcome email you can use to verify
      your account. You may have also gotten your first sale update!
      If you didn't get one now, don't worry, we'll send you one as
      soon as your stores have a good sale. You can update your preferences
      like email frequency and liked stores in the settings page below.
    </p>
    <a onClick={goToSettings}>Settings</a>
  </div>
)

export default WelcomePageComponent
