import React from 'react'
import LinkButton from './ui-kit/LinkButton'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import "./Footer.css"
const Footer =
  ({
     goToPrivacyPolicy
  }) => (
  <div className="contact-us-wrapper">
    <LinkButton
      contents="Privacy Policy"
      onClick={() => {goToPrivacyPolicy()}}
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

const mapStateToProps = () => {return {}}
const mapDispatchToProps = () => {
  return {
    goToPrivacyPolicy: () => {
      browserHistory.push('/privacy_policy')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)