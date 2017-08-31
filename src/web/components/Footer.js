import React from 'react'
import LinkButton from './ui-kit/LinkButton'

import "./Footer.css"
const ContactUs = () => (
  <div className="contact-us-wrapper">
    <LinkButton
      contents="Privacy Policy"
      onClick={() => {debugger}}
      className="privacy-company-link"
    />
    <div className="contact-us-box">
      <div className="contact-us-text">
        Questions, comments, concerns?
      </div>
      <a
        href="mailto:info@lightho.us"
        target="_top"
        className="contact-us-link"
      >
        Contact Us
      </a>
    </div>
  </div>
)

export default ContactUs