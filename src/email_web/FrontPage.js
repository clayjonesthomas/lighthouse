import React, {Component} from 'react'
import {connect} from 'react-redux'

import NavBar from "./NavBar"
import GetStarted from "./GetStarted"
import PickStore from "./PickStore"

import {switchPages} from "./actions"

import "./FrontPage.css"
class FrontPage extends Component {

  render() {
    const {
      onClickLogo,
      scrollPages
    } = this.props
    return (
      <div id="front-page">
        <NavBar
          onClickLogo={onClickLogo}
        />
        {
          <GetStarted
            scrollPages={scrollPages}
            onClickLogo={onClickLogo}/>
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
    page: 1, //state.page
    scrollPages: state.page === 2
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