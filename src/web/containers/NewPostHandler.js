import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import NewPostForm from '../components/NewPostForm'
import {pushPost, cancelPost, onSaveRef} from '../actions/NewPostActions.js'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(cancelPost())
      browserHistory.push('/')
    },
    onSubmit: () => {
      dispatch(pushPost())
        .then(response => browserHistory.push(`/`))
    },
    onSaveTitleRef: (ref) => dispatch(onSaveRef(ref, 'title')),
    onSaveGenderRef: (ref) => dispatch(onSaveRef(ref, 'gender')),
    onSaveAgeRef: (ref) => dispatch(onSaveRef(ref, 'age'))
  }
}

const NewPostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostForm)

export default NewPostHandler