import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import CancelButton from './CancelButton'
import TextBox from './ui-kit/TextBox'
import ShopFinder from './ui-kit/ShopFinder'

const NewPostForm = (
  {
    onSubmit,
    onCancel,
    onSaveTitleRef,
    onUpdateFormShops,
    shops
  }) => (
  <div>
    Submit a Sale
    <TextBox
      refFunc={ref => onSaveTitleRef(ref)}
      label="Sale Specifics: "
    />
    <ShopFinder
      shops={shops}
      onAddNewShop={onUpdateFormShops}
      placeholder="add shops to your favorites..."
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
  onSaveTitleRef: PropTypes.func.isRequired,
  onUpdateFormShops: PropTypes.func.isRequired
}

export default NewPostForm