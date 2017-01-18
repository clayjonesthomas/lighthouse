import {connect} from 'react-redux'
import FrontPage from '../components/FrontPage'

const mapStateToProps = (state) => {
  return {posts: state.displayedPosts}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectPost: null,
    onSelectNewPost: null,
  }
}

const FrontPageHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)

export default FrontPageHandler