import {browserHistory} from 'react-router'
import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'
import {pullFrontPagePosts} from '../actions/FrontPageActions'

class FrontPageHandler extends Component {
  componentDidMount () {
    return this.props.getPosts()
  }

  render () {
    <FrontPage
      posts: this.props.posts
      onSelectPost: this.props.onSelectPost
      onSelectNewPost: this.props.onSelectNewPost/>
  }
}

const mapStateToProps = (state) => {
  return {posts: state.displayedPosts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(pullFrontPagePosts())
    },
    onSelectPost: null,
    onSelectNewPost: () => browserHistory.push('/new')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPageHandler)