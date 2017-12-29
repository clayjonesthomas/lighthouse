import React from 'react'
import Logo from '../../web/ui-kit/Logo'

import "./FrontPage.css"
const FrontPage =
  ({

   }) => (
    <div id="front-page">
      <div id="top-bar">
        <div id="nav-bar-links">
          <span className="nav-bar-item">How It Works</span>
          <span className="nav-bar-item">Sign Up</span>
          <span className="nav-bar-item">Log In</span>
        </div>
      </div>
      <div id="front-page-contents">
        <div id="logo">
          <div id="logo-icon-wrapper">
            <Logo
              scale={2}
              color="#003091" //#0055ff
            />
          </div>
          <span id="logo-name">
            lightho.us
          </span>
        </div>
        <p id="front-page-paragraph">
          A curated list of the
          clothing sales you actually want
          delivered straight to your inbox.
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