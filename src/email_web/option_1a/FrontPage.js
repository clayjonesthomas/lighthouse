import React, {Component} from 'react'
import {connect} from 'react-redux'

import NavBar from "./NavBar"
import GetStarted from "./GetStarted"
import PickStore from "./PickStore"

import {switchPages} from "./actions"

import "./FrontPage.css"
class FrontPage extends Component {

  render() {
    return (
      <div id="front-page">
        <NavBar
          onClickLogo={this.props.onClickLogo}
        />
        {this.props.page === 1 && <GetStarted/>}
        {this.props.page === 2 && <PickStore/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLogo: () => dispatch(switchPages())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)