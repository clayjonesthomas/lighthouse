import React, {Component} from 'react'
import {connect} from 'react-redux'

import NavBar from "./components/NavBar"
import GetStarted from "./components/GetStarted"
import PickStore from "./components/PickStore"

import {goToSignUp} from "./actions"

import "./LandingPage.css"
class FrontPage extends Component {

  render() {
    const {
      goToSignUp,
      scrollPages
    } = this.props
    return (
      <div id="landing-page-container">
        <NavBar
          onClickSignUp={goToSignUp}
        />
        {
          <GetStarted
            scrollPages={scrollPages}
            onClickSignUp={goToSignUp}
          />
        }
        {
          <PickStore scrollPages={scrollPages}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page,
    scrollPages: state.page === 2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToSignUp: () => dispatch(goToSignUp())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)