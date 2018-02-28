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
      flattenedPosts
    } = this.props
    return (
      <div className="text-page text-page-tall">
        <UserFeedPageComponent
          flattenedPosts={flattenedPosts}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    flattenedPosts: state.userTrackedShops.posts ? state.userTrackedShops.posts.flattened_posts : []
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