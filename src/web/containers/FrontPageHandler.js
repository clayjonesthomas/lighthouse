import React, {Component} from 'react'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {pullFrontPagePosts} from '../actions/FrontPageActions'
import {togglePostLike} from '../actions/PostPageActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    this.props.getPosts()
  }

  render () {
    return (
      <FrontPage
        posts={this.props.posts}
        username={this.props.username}
        onLike={this.props.onLike}
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
    onLike: (post_key) => dispatch(togglePostLike(post_key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)