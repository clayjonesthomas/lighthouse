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

import {logOut, pullUserData} from './services/UserActions'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, SETTINGS_PAGE_URL,
  LANDING_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {NEW_PASSWORD_PAGE} from './components/NewPassword/NewPasswordPage'
import {NEW_PASSWORD_SUCCESS_PAGE} from './components/NewPassword/NewPasswordSuccessPage'
import {FORGOT_PASSWORD_PAGE} from './components/ForgotPassword/ForgotPasswordPage'
import {FORGOT_PASSWORD_SUCCESS_PAGE} from './components/ForgotPassword/ForgotPasswordSuccessPage'
import {VERIFICATION_SUCCESS_PAGE} from './components/VerificationSuccessPage/VerificationSuccessPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'

import "./Container.css"
class Container extends Component {

  componentDidMount () {
    this.props.pullUserData()
  }

  render() {
    const {
      page,
      goToSignUp,
      goToLogIn,
      goToSettings,
      logOut,
      email
    } = this.props
    return (
      <div id="container">
        <NavBar
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.page,
    email: state.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => dispatch(push(SIGN_UP_PAGE_URL)),
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL)),
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    logOut: () => {
      dispatch(logOut())
      dispatch(push(LANDING_PAGE_URL))
    },
    pullUserData: () => dispatch(pullUserData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
