import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from '../NavBar/NavBar'
import WelcomePageComponent from './WelcomePageComponent'

import {logOut, pullUserData} from '../../services/UserActions'

import {SETTINGS_PAGE_URL} from '../../urls'

import "./WelcomePage.css"
class WelcomePage extends Component {

  componentDidMount() {
    this.props.pullUserData()
  }

  render() {
    const {
      logOut,
      goToSettings,
      email
    } = this.props
    return (
      <div id="welcome-container">
        <NavBar
          onClickSettings={goToSettings}
          onClickLogout={logOut}
          email={email}
        />
        <WelcomePageComponent
          goToSettings={goToSettings}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
)(WelcomePage)
