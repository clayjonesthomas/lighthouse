import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './ui-kit/TextBox'

const SALE_TITLE = "saleTitle"

const NewPostForm = (
  {
    onSubmit,
    onCancel,
    onSaveTitleRef,
    onSaveGenderRef,
    onSaveAgeRef
  }) => (
  <div>
    Submit a Sale
    <TextBox
      idName={SALE_TITLE}
      refFunc={ref => onSaveTitleRef(ref)}
    />
    <CancelButton
      onClick={onCancel}
    />
    <SubmitButton
      onClick={() => onSubmit(SALE_TITLE)}
    />
  </div>
)

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaveTitleRef: PropTypes.func.isRequired,
  onSaveGenderRef: PropTypes.func.isRequired,
  onSaveAgeRef: PropTypes.func.isRequired
}

export default NewPostForm