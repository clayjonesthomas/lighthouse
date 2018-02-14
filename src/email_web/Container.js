import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import FrontPage from './components/FrontPage/FrontPage'
import LogInPage from './components/LogInPage/LogInPage'
import NewPasswordPage from './components/NewPassword/NewPasswordPage'
import NewPasswordSuccessPage from './components/NewPassword/NewPasswordSuccessPage'
import ForgotPasswordPage from './components/ForgotPassword/ForgotPasswordPage'
import ForgotPasswordSuccessPage from './components/ForgotPassword/ForgotPasswordSuccessPage'
import VerificationSuccessPage from './components/VerificationSuccessPage/VerificationSuccessPage'
import SettingsPage from './components/SettingsPage/SettingsPage'
import HowItWorksPage from './components/HowItWorksPage/HowItWorksPage'

import {logOut, pullUserData} from './services/UserActions'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, SETTINGS_PAGE_URL,
  LANDING_PAGE_URL, HOW_IT_WORKS_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {NEW_PASSWORD_PAGE} from './components/NewPassword/NewPasswordPage'
import {NEW_PASSWORD_SUCCESS_PAGE} from './components/NewPassword/NewPasswordSuccessPage'
import {FORGOT_PASSWORD_PAGE} from './components/ForgotPassword/ForgotPasswordPage'
import {FORGOT_PASSWORD_SUCCESS_PAGE} from './components/ForgotPassword/ForgotPasswordSuccessPage'
import {VERIFICATION_SUCCESS_PAGE} from './components/VerificationSuccessPage/VerificationSuccessPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'
import {HOW_IT_WORKS_PAGE} from './components/HowItWorksPage/HowItWorksPage'

import "./Container.css"
class Container extends Component {

  componentDidMount () {
    this.props.pullUserData()
  }

  render() {
    const {
      page,
      isDisplayLogo,
      goToHome,
      goToSignUp,
      goToLogIn,
      goToHowItWorks,
      goToSettings,
      logOut,
      email
    } = this.props
    return (
      <div
        id="container"
        className={(page !== LANDING_PAGE && page !== SIGN_UP_PAGE) &&
        "container-settings"}>
        <NavBar
          isDisplayLogo={isDisplayLogo}
          onClickLogo={email ? goToSettings : goToHome}
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
          onClickHowItWorks={goToHowItWorks}
          onClickSettings={goToSettings}
          onClickLogout={logOut}
          email={email}
        />
        {(page === LANDING_PAGE || page === SIGN_UP_PAGE) &&
        <FrontPage
          page={page}
        />
        }
        {page === LOG_IN_PAGE &&
        <LogInPage/>
        }
        {page === NEW_PASSWORD_PAGE &&
        <NewPasswordPage
          email={this.props.params.email}
          signupKey={this.props.params.signupKey}
        />
        }
        {page === NEW_PASSWORD_SUCCESS_PAGE &&
        <NewPasswordSuccessPage
          goToSettings={goToSettings}
        />
        }
        {page === FORGOT_PASSWORD_PAGE &&
        <ForgotPasswordPage/>
        }
        {page === FORGOT_PASSWORD_SUCCESS_PAGE &&
        <ForgotPasswordSuccessPage/>
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
    isDisplayLogo: ownProps.page !== LANDING_PAGE,
    email: state.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToHome: () => dispatch(push(LANDING_PAGE_URL)),
    goToSignUp: () => dispatch(push(SIGN_UP_PAGE_URL)),
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL)),
    goToHowItWorks: () => dispatch(push(HOW_IT_WORKS_PAGE_URL)),
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    logOut: () => {
      dispatch(logOut())
    },
    pullUserData: () => dispatch(pullUserData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
