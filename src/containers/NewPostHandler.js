import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {addPost, cancelPost, updateForm} from '../actions'

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: dispatch(cancelPost),
    onSubmit: dispatch(addPost),
    onUpdate: dispatch(updateForm)
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler