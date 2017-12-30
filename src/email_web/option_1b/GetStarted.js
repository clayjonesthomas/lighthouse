import React from 'react'

import "./GetStarted.css"
const GetStarted = ({}) => (
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
)

export default GetStarted

