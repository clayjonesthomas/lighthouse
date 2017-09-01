import React, {Component} from 'react'
import {connect} from 'react-redux'
import FrontPageHandler from './FrontPageHandler'
import {pullFrontPagePosts, pullMoreFrontPagePosts}
  from '../actions/FrontPageActions'

class MyFeedPageHandler extends Component {
  render () {
    return (
      <FrontPageHandler
        getPosts={this.props.getPosts}
        getMorePosts={this.props.getMorePosts}
        isMyFeed={this.props.isMyFeed}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isMyFeed: true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(pullFrontPagePosts(false)),
    getMorePosts: () => dispatch(pullMoreFrontPagePosts(false))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFeedPageHandler)