import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {addPost, cancelPost} from '../actions/index.js'

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(cancelPost())
    },
    onSubmit: (post) => {
      dispatch(addPost(post))
    }
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler