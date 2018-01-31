import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import FrontPage from './components/FrontPage/FrontPage'
import LogInPage from './components/LogInPage/LogInPage'
import SettingsPage from './components/SettingsPage/SettingsPage'

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, SETTINGS_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'

import "./Container.css"
class Container extends Component {

  render() {
    const {
      page,
      goToSignUp,
      goToLogIn,
      goToSettings,
      logOut
    } = this.props
    return (
      <div id="container">
        <NavBar
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
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
        {page === SETTINGS_PAGE &&
          <SettingsPage/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => dispatch(push(SIGN_UP_PAGE_URL)),
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL)),
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
