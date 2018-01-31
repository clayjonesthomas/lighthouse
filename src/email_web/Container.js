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

import {SIGN_UP_PAGE_URL, LOG_IN_PAGE_URL} from './urls'

import {LANDING_PAGE} from './components/LandingPage/LandingPage'
import {SIGN_UP_PAGE} from './components/SignUpPage/SignUpPage'
import {LOG_IN_PAGE} from './components/LogInPage/LogInPage'
import {NEW_PASSWORD_PAGE} from './components/NewPassword/NewPasswordPage'
import {NEW_PASSWORD_SUCCESS_PAGE} from './components/NewPassword/NewPasswordSuccessPage'
import {FORGOT_PASSWORD_PAGE} from './components/ForgotPassword/ForgotPasswordPage'
import {FORGOT_PASSWORD_SUCCESS_PAGE} from './components/ForgotPassword/ForgotPasswordSuccessPage'

import "./Container.css"
class Container extends Component {

  render() {
    const {
      page,
      goToSignUp,
      goToLogIn
    } = this.props
    return (
      <div id="container">
        <NavBar
          onClickSignUp={goToSignUp}
          onClickLogIn={goToLogIn}
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
          <NewPasswordSuccessPage/>
        }
        {page === FORGOT_PASSWORD_PAGE &&
          <ForgotPasswordPage/>
        }
        {page === FORGOT_PASSWORD_SUCCESS_PAGE &&
          <ForgotPasswordSuccessPage/>
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
    goToLogIn: () => dispatch(push(LOG_IN_PAGE_URL))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
