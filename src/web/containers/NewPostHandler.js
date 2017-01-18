import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {pushPost, cancelPost} from '../actions/NewPostActions.js'

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
      dispatch(pushPost(collectPost(id_name))).then(() =>
        console.log('post has been pushed')
      )
    }
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler