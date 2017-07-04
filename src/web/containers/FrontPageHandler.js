import {browserHistory} from 'react-router'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {pullFrontPagePosts, pullUserInfo} from '../actions/FrontPageActions'
import {showLogin} from '../actions/AuthActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    this.props.getPosts()
    this.props.getUserInfo()
  }

  render () {
    return (
      <FrontPage
        posts={this.props.posts}
        onSelectPost={this.props.onSelectPost}
        onSelectNewPost={this.props.onSelectNewPost}
        onShowLogin={this.props.onShowLogin}
        username={this.props.username}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.displayedPosts,
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(pullFrontPagePosts())
    },
    getUserInfo: () => {
      dispatch(pullUserInfo())
    },
    onSelectNewPost: () => browserHistory.push('/new'),
    onShowLogin: () => dispatch(showLogin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)