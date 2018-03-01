import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {pullUserData, pullUserTrackedShops} from '../../services/UserActions'

import UserFeedPageComponent from './UserFeedPageComponent'

export const USER_FEED_PAGE = 'USER_FEED_PAGE'

class UserFeedPage extends Component {
  componentDidMount() {
    this.props.getUserPosts()
  }

  render() {
    const {
      activePosts
    } = this.props
    return (
      <div className="text-page text-page-tall">
        <UserFeedPageComponent
          activePosts={activePosts}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activePosts: state.userTrackedShopPosts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPosts: () => dispatch(pullUserTrackedShops()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeedPage)