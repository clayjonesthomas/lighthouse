import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import LandingPageHandler from './components/LandingPage/LandingPageHandler'
import SignUpPageHandler from './components/SignUpPage/SignUpPageHandler'
import {goToSignUp} from './actions'
import {SIGN_UP_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPageHandler'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPageHandler'

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
        <div id="contents-container">
          {
            <LandingPageHandler
              shouldDisplay={page === LANDING_PAGE}
            />
          }
          {
            <SignUpPageHandler
              shouldDisplay={page === SIGN_UP_PAGE}
            />
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

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => {
      dispatch(goToSignUp())
      setTimeout(() =>
          dispatch(push(SIGN_UP_PAGE_URL)),
        500)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)