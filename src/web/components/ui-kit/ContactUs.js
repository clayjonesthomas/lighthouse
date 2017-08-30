import React from 'react'

import "./ContactUs.css"
const ContactUs = () => (
  <div className="contact-us-wrapper">
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