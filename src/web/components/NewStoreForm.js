import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './ui-kit/TextBox'

const NewStoreForm =
  ({
    onSaveNameRef,
    onSaveWebsiteRef,
    onSaveIconRef,
    onCancel,
    onIconChange,
    onSubmit
   }) => (
    <div>
      Submit a Sale
      <TextBox
        refFunc={ref => onSaveNameRef(ref)}
        label="Store Name: "
      />
      <TextBox
        refFunc={ref => onSaveWebsiteRef(ref)}
        label="Full Home Website Address: "
      />
      <div>
        Select an image file:
        <input
          type='file' label='Upload' accept='.jpeg'
          ref={(ref) => onSaveIconRef(ref)}
          onChange={(file) => onIconChange(file)}
        />
      </div>
      <CancelButton
        onClick={onCancel}
      />
      <SubmitButton
        onClick={() => onSubmit()}
      />
    </div>
  )

NewStoreForm.propTypes = {
  onSaveNameRef: PropTypes.func.isRequired,
  onSaveWebsiteRef: PropTypes.func.isRequired,
  onSaveIconRef: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onIconChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewStoreForm