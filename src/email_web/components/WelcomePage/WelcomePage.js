import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from '../NavBar/NavBar'
import WelcomePageComponent from './WelcomePageComponent'

import {SETTINGS_PAGE_URL} from '../../urls'

import "./WelcomePage.css"
class WelcomePage extends Component {

  render() {
    const {
      logOut,
      goToSettings
    } = this.props
    return (
      <div id="welcome-container">
        <NavBar
          onClickSettings={goToSettings}
          onClickLogout={logOut}
        />
        <WelcomePageComponent
          goToSettings={goToSettings}
        />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    logOut: () => {
      dispatch() //TODO in backend pr
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
