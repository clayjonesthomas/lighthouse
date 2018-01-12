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
        {
          <GetStarted scroll_pages={this.props.scroll_pages}/>
        }
        {
          <PickStore scroll_pages={this.props.scroll_pages}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: 1, //state.page
    scroll_pages: state.page === 2
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