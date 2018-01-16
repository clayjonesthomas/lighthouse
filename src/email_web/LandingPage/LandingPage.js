import React from 'react'
import Logo from '../ui-kit/Logo'

import "./LandingPage.css"
const LandingPage = ({
                     shouldDisplay,
                     goToSignUp
                   }) => (
  <div className={shouldDisplay ? "front-page-contents" :
    "front-page-contents front-page-contents-hidden"}>
    <div id="logo">
      <div id="logo-wrapper">
        <Logo
          scale={2}
          color="#003091"
        />
      </div>
      <span>
        lightho.us
      </span>
    </div>
    <p id="front-page-paragraph">
      We keep track of the stores you love so you
      don't have to, sending the best sales straight to
      your inbox.
    </p>
    <div
      className='submit-button'
      onClick={goToSignUp}>
      SIGN ME UP
    </div>
  </div>
)

export default LandingPage
