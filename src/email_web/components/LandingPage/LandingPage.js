import React from 'react'
import LogoName from '../../ui-kit/LogoName/LogoName'
import {smalt} from '../../ui-kit/colors'

import "./LandingPage.css"
const LandingPage = ({
                       shouldDisplay,
                       goToSignUp
                     }) => (
  <div id="landing-page-wrapper">
    <div id="logo">
      <LogoName
        scale={2}
        color={smalt}
      />
    </div>
    <p id="landing-page-paragraph">
      We keep track of the stores you love so you
      don't have to, sending the best sales straight to
      your inbox.
    </p>
    <input
      type="button"
      className='submit-button'
      onClick={goToSignUp}
      value="SIGN ME UP"
    />
  </div>
)

export default LandingPage
