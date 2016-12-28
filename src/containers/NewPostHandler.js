import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {addPost, cancelPost, updateForm} from '../actions/index.js'

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
    },
    onUpdate: (key, value) => {
      dispatch(updateForm(key, value))
    }
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler