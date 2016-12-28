import React, {PropTypes} from 'react'
import SubmitButton from './SubmitButton'

const NewPostForm = ({onSubmit, onCancel, onUpdate, post}) => (
  <p>
    Submit a Sale
    <TextBox
      onUpdate={onUpdate}
    />
    <CancelButton
      onClick={onCancel}
    />
    <SubmitButton
      onClick={() => onSubmit(post)}
    />
  </p>
)

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default NewPostForm