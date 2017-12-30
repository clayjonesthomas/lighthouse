import React from 'react'
import Logo from '../../web/ui-kit/Logo'
import LogoCircle from '../../web/ui-kit/LogoCircle'

import "./FrontPage.css"
const FrontPage =
  ({

   }) => (
    <div id="front-page">
      <div id="top-bar">
        <span id="logo">
          <div id="logo-icon-wrapper">
            <LogoCircle
              scale={.5}
              color="#ececec" //#0055ff
            />
          </div>
        </span>
        <div id="nav-bar-links">
          <span className="nav-bar-item">How It Works</span>
          <span className="nav-bar-item">Sign Up</span>
          <span className="nav-bar-item">Log In</span>
        </div>
      </div>
      <div id="front-page-contents">
        <h1 id="front-page-title">
          The clothing sales you want
          delivered straight to you
        </h1>
        <p id="front-page-paragraph">
          <span id="lighthous-inline">
            lightho.us
          </span>
          keeps track of the clothing stores you love
          so you don't have to, sending the best sales
          straight to your inbox.
        </p>
        <input
          type="button"
          value="Let's Get Started"
          id="try-it-button"
        />
      </div>
    </div>
  )

export default FrontPage