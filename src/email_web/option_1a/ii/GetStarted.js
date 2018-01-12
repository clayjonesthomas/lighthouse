import React from 'react'
import Logo from '../../../web/ui-kit/Logo'

import "./GetStarted.css"
const GetStarted = ({
  scroll_pages,
  onClickLogo
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
      We keep track of the stores you love so you
      don't have to, sending the best sales straight to
      your inbox.
    </p>
    <div
      className='try-it-button_2'
      onClick={onClickLogo}>
      SIGN ME UP
    </div>
  </div>
)

export default GetStarted

