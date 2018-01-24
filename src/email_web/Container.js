import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import LandingPageHandler from './components/LandingPage/LandingPageHandler'
import SignUpPageHandler from './components/SignUpPage/SignUpPageHandler'
import {goToSignUp} from './actions'
import {SIGN_UP_PAGE_URL} from './urls'

export const SIGN_UP_PAGE = 'SIGN_UP_PAGE'
export const LANDING_PAGE = 'LANDING_PAGE'

import "./Container.css"
class Container extends Component {

  render() {
    const {
      goToSignUp,
      page
    } = this.props
    return (
      <div id="main-page-container">
        <NavBar
          onClickSignUp={goToSignUp}
        />
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.switchToPage || ownProps.page
  }
}

const timeOutDuration = 500

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => {
      dispatch(goToSignUp())
      setTimeout(() =>
          dispatch(push(SIGN_UP_PAGE_URL)),
        timeOutDuration)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
