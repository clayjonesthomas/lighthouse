import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './ui-kit/TextBox'
import ShopFinder from './ShopFinder'

const NewPostForm = (
  {
    onSubmit,
    onCancel,
    onSaveTitleRef,
    onSaveGenderRef,
    onSaveAgeRef,
    shops
  }) => (
  <div>
    Submit a Sale
    <TextBox
      refFunc={ref => onSaveTitleRef(ref)}
      label="Sale Specifics: "
    />
    <ShopFinder
      shops={[]}
      onAddNewShop={}
    />
    <CancelButton
      onClick={onCancel}
    />
    <SubmitButton
      onClick={() => onSubmit()}
    />
  </div>
)

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaveTitleRef: PropTypes.func.isRequired
}

export default NewPostForm