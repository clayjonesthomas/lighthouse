import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './ui-kit/TextBox'

const SALE_TITLE = "saleTitle"

const NewPostForm = ({onSubmit, onCancel}) => (
  <p>
    Submit a Sale
    <TextBox
      idName={SALE_TITLE}
    />
    <CancelButton
      onClick={onCancel}
    />
    <SubmitButton
      onClick={() => onSubmit(SALE_TITLE)}
    />
  </p>
)

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default NewPostForm