import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from '../../ui-kit/Spinner'

import {pullUserTrackedShops} from '../../services/UserActions'

import UserFeedPageComponent from './UserFeedPageComponent'

export const USER_FEED_PAGE = 'USER_FEED_PAGE'

class UserFeedPage extends Component {
  componentDidMount() {
    this.props.getUserPosts()
  }

  render() {
    const {
      activePosts,
      isLoadingPosts
    } = this.props
    return (
      <div className="text-page text-page-tall">
        {isLoadingPosts ?
          <div>
            <h1 id="user-feed-page-title">
              All Active Sales
            </h1>
            <div>
              <Spinner colorHex={"#aec7ea"}/>
            </div>
          </div>
          :
          <UserFeedPageComponent
            activePosts={activePosts}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activePosts: state.userTrackedShopPosts,
    isLoadingPosts: state.isLoadingPosts
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
