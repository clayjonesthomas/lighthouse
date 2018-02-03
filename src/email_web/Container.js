import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import FrontPage from './components/FrontPage/FrontPage'
import LogInPage from './components/LogInPage/LogInPage'
import VerificationSuccessPage from './components/VerificationSuccessPage/VerificationSuccessPage'
import SettingsPage from './components/SettingsPage/SettingsPage'
import HowItWorksPage from './components/HowItWorksPage/HowItWorksPage'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, 
  SETTINGS_PAGE_URL, HOW_IT_WORKS_PAGE_URL} 
    from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {VERIFICATION_SUCCESS_PAGE} from './components/VerificationSuccessPage/VerificationSuccessPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'
import {HOW_IT_WORKS_PAGE} from './components/HowItWorksPage/HowItWorksPage'

import "./Container.css"
class Container extends Component {

  render() {
    const {
      page,
      isDisplayLogo,
      goToHome,
      goToSignUp,
      goToLogIn,
      goToHowItWorks,
      goToSettings,
      logOut
    } = this.props
    return (
      <div id="container">
        <NavBar
          isDisplayLogo={isDisplayLogo}
          onClickLogo={goToHome}
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
          onClickHowItWorks={goToHowItWorks}
          onClickSettings={goToSettings}
          onClickLogout={logOut}
        />
        {(page === LANDING_PAGE || page === SIGN_UP_PAGE) &&
          <FrontPage
            page={page}
          />
        }
        {page === LOG_IN_PAGE &&
          <LogInPage/>
        }
        {page === VERIFICATION_SUCCESS_PAGE &&
          <VerificationSuccessPage/>
        }
        {page === SETTINGS_PAGE &&
          <SettingsPage/>
        }
        {page === HOW_IT_WORKS_PAGE &&
          <HowItWorksPage/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.page,
    isDisplayLogo: ownProps.page !== LANDING_PAGE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToHome: () => dispatch(push('/')),
    goToSignUp: () => dispatch(push(SIGN_UP_PAGE_URL)),
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL)),
    goToHowItWorks: () => dispatch(push(HOW_IT_WORKS_PAGE_URL)),
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    logOut: () => {
      dispatch() //TODO in backend pr
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
