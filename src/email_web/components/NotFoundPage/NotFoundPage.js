import React from 'react'
import LogoCircle from '../../ui-kit/LogoCircle/LogoCircle'
import {smalt} from '../../ui-kit/colors'

import "./NotFoundPage.css"

const NotFoundPage = 
  ({}) => (
    <div id="not-found-container" className="text-page-container">
      <div className="text-page">
        <LogoCircle
          scale={1}
          color={smalt}
        />
        <h2>
          Sorry, we can't find the page you're looking for!
        </h2>
        <p><a href="/">Return to site</a></p>
      </div>
    </div>
  )

export default NotFoundPage