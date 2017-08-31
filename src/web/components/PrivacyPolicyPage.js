import React from 'react'
import {Row} from 'react-bootstrap'
import LinkButton from './ui-kit/LinkButton'

import "./PrivacyPolicyPage.css"
const PrivacyPolicyPage =
  ({
     isMobile
   }) => (
    <div>
      <Row>
        <h1>{"Privacy Policy"}</h1>
        <p>
          {
            "Our privacy policy explains what " +
            "information we collect from our users," +
            " under what circumstances we collect it," +
            " what we do with it, and what technologies," +
            " such as cookies, we use to do so."
          }
        </p>
        <br/>
        <h2>{"Cookies"}</h2>
        <p>
          {
            "Like most web-based services, Lightho.us " +
            "uses cookies to gather information about " +
            "how its users are using the service. " +
            "Cookies are little pieces of information " +
            "your browser saves for you that are used " +
            "mostly for user identification. Our primary " +
            "use for this is to remember you when you sign " +
            "in, but we also use third-party services such " +
            "as Google Analytics to help us understand what " +
            "we can do to make our website better for you " +
            "(if you would like to learn more about Google’s " +
            "cookie policy, go here).  We currently do not " +
            "use the information we gather to serve " +
            "advertising or make a profit in any way, " +
            "just to make our site better. If at a later " +
            "date that were to change, the privacy policy " +
            "will be updated to reflect those policy changes."
          }
        </p>
        <h2>{"What You Can Do"}</h2>
        <p>
          {
            "Most web browsers give you the option to disable " +
            "\"first-party\" cookies and \"third-party\" cookies. " +
            "First-party cookies are the cookies a website serves " +
            "its users so it can function properly. We strongly " +
            "encourage you do leave these cookies enabled as you " +
            "may encounter difficulty using Lightho.us if you " +
            "prevent them."
          }
        </p>
        <br/>
        <p>
          {
            "Third-party cookies are cookies from services such " +
            "as Google Analytics that are not the primary operators of " +
            "the page you are visiting. You can also opt out of these " +
            "types of cookies by changing the settings in your browser."
          }
        </p>
        <br/>
        <p>
          Questions about our policy? Please&nbsp;
        </p>
        <LinkButton
          onClick={() => {debugger}}
          contents="contact us"
        />
        <p>.</p>
      </Row>
    </div>
  )

export default PrivacyPolicyPage