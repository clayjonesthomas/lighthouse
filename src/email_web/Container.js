import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import FrontPage from './components/FrontPage/FrontPage'
import LogInPage from './components/LogInPage/LogInPage'
import SettingsPage from './components/SettingsPage/SettingsPage'

import {logOut, pullUserData} from './services/UserActions'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, SETTINGS_PAGE_URL,
  LANDING_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
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
