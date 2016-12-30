import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {addPost, cancelPost} from '../actions/index.js'

const mapStateToProps = (state) => {
  return state
}

const collectPost = (id_name) => {
  return {
    title: document.getElementById(id_name).value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(cancelPost())
    },
    onSubmit: (id_name) => {
      dispatch(addPost(collectPost(id_name)))
    }
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler