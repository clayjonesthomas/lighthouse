import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import NavBar from './components/NavBar/NavBar'
import FrontPage from './components/FrontPage/FrontPage'

import {SIGN_UP_PAGE_URL} from './urls'

import {LANDING_PAGE, SIGN_UP_PAGE} from './components/FrontPage/FrontPage'

import "./Container.css"
class Container extends Component {

  render() {
    const {
      page,
      goToSignUp
    } = this.props
    return (
      <div id="container">
        <NavBar
          onClickSignUp={goToSignUp}
        />
        {(page === LANDING_PAGE || page === SIGN_UP_PAGE) &&
          <FrontPage
            page={page}
          />
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
    goToSignUp: () => {
      dispatch(push(SIGN_UP_PAGE_URL))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
