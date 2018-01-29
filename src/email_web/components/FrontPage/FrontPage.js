import React, {Component} from 'react'
import {connect} from 'react-redux'

import LandingPageHandler from '../LandingPage/LandingPage'
import SignUpPageHandler from '../SignUpPage/SignUpPage'

import {SIGN_UP_PAGE} from '../SignUpPage/SignUpPage'
import {LANDING_PAGE} from '../LandingPage/LandingPage'

class FrontPage extends Component {
  render () {
    const {
      page
    } = this.props
    return (
      <div id="contents-container" ref="contents">
        {
          <div className={page === LANDING_PAGE ? "landing-page-contents" :
            "landing-page-contents landing-page-contents-hidden"}>
            <LandingPageHandler/>
          </div>
        }
        {
          <div className={page === SIGN_UP_PAGE ? "sign-up-contents" :
            "sign-up-contents sign-up-contents-hidden"}>
            <SignUpPageHandler
              shouldDisplay={page === SIGN_UP_PAGE}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.switchToPage || ownProps.page
  }
}

export default connect(
  mapStateToProps
)(FrontPage)

