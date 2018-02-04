import React from 'react'

import "./HowItWorksPage.css"

export const HOW_IT_WORKS_PAGE = 'HOW_IT_WORKS_PAGE'

const HowItWorksPage =
  ({}) => (
    <div id="how-it-works-container">
      <h1 
        id="how-it-works-title"
        className="form-title"
      >
        How It Works
      </h1>
      <p className="how-it-works-section">
        You tell us which stores you care about, and we’ll send you email notifications 
        for the sales we know you’ll like.
      </p>
      <p className="how-it-works-section">
        We won’t spam you with emails about every small sale. Instead, we'll tell you about 
        deals that are really good and  deals that don't happen often.
      </p>
      <p className="how-it-works-section">
        If you decide that you want to see more, you can opt for a daily email
        with all sales.
      </p>
      <p className="how-it-works-section">
        Still have questions? <a href="mailto:info@lightho.us" target="_top">Email our team!</a>
      </p>
    </div>
  )

export default HowItWorksPage