import React, {PropTypes} from 'react'
import SubmitButton from 'ui-kit/SubmitButton'
import CancelButton from 'ui-kit/CancelButton'
import TextBox from 'ui-kit/TextBox'

const EditShop =
  ({
    onSaveNameRef,
    onSaveWebsiteRef,
    onSaveIconUrlRef,
    onCancel,
    onSubmit,
    shopName,
    shopWebsite,
    shopIconUrl
   }) => (
    <div>
      Submit a Sale
      <TextBox
        refFunc={ref => onSaveNameRef(ref)}
        label="Shop Name: "
        textBoxValue={shopName}
      />
      <TextBox
        refFunc={ref => onSaveWebsiteRef(ref)}
        label="Full Home Website Address: "
        textBoxValue={shopWebsite}
      />
      <TextBox
        refFunc={ref => onSaveIconUrlRef(ref)}
        label="Icon Url: "
        textBoxValue={shopIconUrl}
      />
      {/*<div>*/}
        {/*Select an image file:*/}
        {/*<input*/}
          {/*type='file' label='Upload' accept='.jpeg'*/}
          {/*ref={(ref) => onSaveIconRef(ref)}*/}
          {/*onChange={(file) => onIconChange(file)}*/}
        {/*/>*/}
      {/*</div>*/}
      <CancelButton
        onClick={onCancel}
      />
      <SubmitButton
        onClick={() => onSubmit()}
      />
    </div>
  )

EditShop.propTypes = {
  onSaveNameRef: PropTypes.func.isRequired,
  onSaveWebsiteRef: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  shopName: PropTypes.string,
  shopWebsite: PropTypes.string,
  shopIconUrl: PropTypes.string
}

export default EditShop