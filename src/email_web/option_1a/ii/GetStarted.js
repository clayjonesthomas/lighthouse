import React from 'react'
import Logo from '../../../web/ui-kit/Logo'

import "./GetStarted.css"
const GetStarted = ({
  scroll_pages
                    }) => (
  <div className={!scroll_pages ? "front-page-contents":
    "front-page-contents front-page-contents-hidden"}>
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
    <div
      className={'try-it-button'}>
      Let's Get Started
    </div>
  </div>
)

export default GetStarted

