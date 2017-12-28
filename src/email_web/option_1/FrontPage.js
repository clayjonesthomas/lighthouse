import React from 'react'
import FullLogo from '../../web/ui-kit/FullLogo'
import LogoCircle from '../../web/ui-kit/LogoCircle'
import Logo from '../../web/ui-kit/Logo'

import "./FrontPage.css"
const FrontPage =
  ({

   }) => (
    <div id="front-page">
      <div id="logo">
        <Logo
          scale={2}
          color="#aaaaaa"
          class="logo-icon"
        />
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
        value="Try it out"
        id="try-it-button"
      />
    </div>
  )

export default FrontPage