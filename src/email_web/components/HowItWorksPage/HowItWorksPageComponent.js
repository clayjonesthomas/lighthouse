import React from 'react'

import "./HowItWorksPage.css"

const HowItWorksPageComponent =
  ({
    goToPrivacyPolicy
  }) => (
    <div 
      id="how-it-works-page"
      className="text-page text-page-tall"
    >
      <h1 className="form-title">
        How It Works
      </h1>
      <p className="how-it-works-section">
        You tell us which stores you care about, and we’ll send
        you email notifications for the sales we know you’ll like.
      </p>
      <p className="how-it-works-section">
        We won’t crowd your inbox with every little sale.
        Instead, we'll send you the sales we think are exceptional
        based on what a store normally runs. So for a store
        that runs lots of sales, 50% off everything might be
        a big deal, but for a store that doesn't usually have sales,
        free shipping may be all it takes to move the needle.
        No matter the store, we'll get you the info that really
        matters and not bother you with the rest.
      </p>
      <p className="how-it-works-section">
        If you don't want to miss a thing, fear not! You can also sign
        up to receive daily emails with all the updates we can find,
        big and small.
      </p>
      <p className="how-it-works-section">
        Still have questions? <a href="mailto:info@lightho.us" target="_top">Email our team!</a>
      </p>
      <p className="how-it-works-section">
        <a onClick={goToPrivacyPolicy} tabIndex="-1">Privacy Policy</a>
      </p>
    </div>
  )

export default HowItWorksPageComponent
