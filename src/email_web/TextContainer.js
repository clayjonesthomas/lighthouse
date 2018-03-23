import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import WelcomePage from './components/WelcomePage/WelcomePage'
import HowItWorksPage from './components/HowItWorksPage/HowItWorksPage'
import SettingsPage from './components/SettingsPage/SettingsPage'
import UserFeedPage from './components/UserFeedPage/UserFeedPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage'

import {logOut, pullUserEmail} from './services/UserActions'


import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL, SETTINGS_PAGE_URL,
  LANDING_PAGE_URL, HOW_IT_WORKS_PAGE_URL, USER_FEED_PAGE_URL,
  PRIVACY_POLICY_PAGE_URL} from './urls'

import {WELCOME_PAGE} from './components/WelcomePage/WelcomePage'
import {HOW_IT_WORKS_PAGE} from './components/HowItWorksPage/HowItWorksPage'
import {SETTINGS_PAGE} from './components/SettingsPage/SettingsPage'
import {USER_FEED_PAGE} from './components/UserFeedPage/UserFeedPage'
import {PRIVACY_POLICY_PAGE} from './components/PrivacyPolicyPage/PrivacyPolicyPage'

import "./TextContainer.css"
class TextContainer extends Component {

  componentDidMount () {
    this.props.pullUserEmail()
  }

  render() {
    const {
      page,
      goToHome,
      goToSignUp,
      goToLogIn,
      goToHowItWorks,
      goToSettings,
      goToUserFeed,
      logOut,
      email
    } = this.props
    return (
      <div
        className={"container-settings text-page-container"}>
        <NavBar
          isDisplayLogo={true}
          onClickLogo={email ? goToUserFeed : goToHome}
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
          onClickHowItWorks={goToHowItWorks}
          onClickSettings={goToSettings}
          onClickLogout={logOut}
          email={email}
        />
        {page === WELCOME_PAGE &&
        <WelcomePage/>
        }
        {page === HOW_IT_WORKS_PAGE &&
        <HowItWorksPage/>
        }
        {page === SETTINGS_PAGE &&
        <SettingsPage/>
        }
        {page === USER_FEED_PAGE &&
        <UserFeedPage/>
        }
        {page === PRIVACY_POLICY_PAGE &&
        <PrivacyPolicyPage/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.page,
    email: state.userEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToHome: () => dispatch(push(LANDING_PAGE_URL)),
    goToSignUp: () => dispatch(push(SIGN_UP_PAGE_URL)),
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL)),
    goToHowItWorks: () => dispatch(push(HOW_IT_WORKS_PAGE_URL)),
    goToSettings: () => dispatch(push(SETTINGS_PAGE_URL)),
    goToUserFeed: () => dispatch(push(USER_FEED_PAGE_URL)),
    logOut: () => {
      dispatch(logOut())
    },
    pullUserEmail: () => dispatch(pullUserEmail())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextContainer)