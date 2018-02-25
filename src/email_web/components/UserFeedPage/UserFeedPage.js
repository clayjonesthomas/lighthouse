import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {pullUserData} from '../../services/UserActions'

import UserFeedPageComponent from './UserFeedPageComponent'

export const USER_FEED_PAGE = 'USER_FEED_PAGE'

class UserFeedPage extends Component {
	componentDidMount() {
    this.props.getUserData()
	}

  render() {
    const {

    } = this.props
    return (
      <UserFeedPageComponent

      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(pullUserData()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeedPage)