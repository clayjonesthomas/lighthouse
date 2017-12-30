import React, {Component} from 'react'
import {connect} from 'react-redux'

import NavBar from "./NavBar"
import GetStarted from "./GetStarted"
import PickStore from "./PickStore"

import "./FrontPage.css"
class FrontPage extends Component {

  render() {
    return (
      <div id="front-page">
        <NavBar/>
        {this.props.page === 1 && <GetStarted/>}
        {this.props.page === 2 && <PickStore/>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: 2
  }
}

export default connect(
  mapStateToProps
)(FrontPage)