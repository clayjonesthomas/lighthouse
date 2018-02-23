import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from '../NavBar/NavBar'
import WelcomePageComponent from './WelcomePageComponent'

import {logOut, pullUserEmail} from '../../services/UserActions'

import {HOW_IT_WORKS_PAGE_URL, SETTINGS_PAGE_URL} from '../../urls'

import "./WelcomePage.css"

export const WELCOME_PAGE = 'WELCOME_PAGE'

class WelcomePage extends Component {

  componentDidMount() {
    this.props.pullUserEmail()
  }

  render() {
    const {
      goToSettings,
    } = this.props
    return (
      <div className="text-heavy-container">
        <WelcomePageComponent
          goToSettings={goToSettings}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    pullUserEmail: () => dispatch(pullUserEmail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage)
