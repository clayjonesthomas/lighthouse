import React, {PropTypes} from 'react'
import SubmitButton from './SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './TextBox'

const NewPostForm = ({onSubmit, onCancel, post}) => (
  <p>
    Submit a Sale
    <TextBox
      idName="SaleTitle"
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
}

export default NewPostForm