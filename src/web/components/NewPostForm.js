import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import TextBox from './ui-kit/TextBox'
import ShopFinder from './ui-kit/ShopFinder'
import {ControlLabel} from 'react-bootstrap'

import "./FrontPage.css"
import "./ui-kit/TextBox.css"
import "./modals/ModalStyle.css"
import "./NewPostForm.css"
const NewPostForm = (
  {
    onSubmit,
    onCancel,
    onSaveTitleRef,
    onUpdateFormShops,
    shops,
    isMobile
  }) => (
  <div
    id={isMobile?"new-post-form":"new-post-form-desktop"}
    className={isMobile?"":"desktop-content-box"}>
    <span className={isMobile?"":"submit-sale-desktop"}>
      Submit a Sale
    </span>
    <TextBox
      className={isMobile?"mobile-textbox":""}
      refFunc={ref => onSaveTitleRef(ref)}
      label="Sale Specifics: "
      componentClass={"textarea"}
    />
    <ControlLabel className="text-box-label label-new-shop-finder">
      Shop:
    </ControlLabel>
    <ShopFinder
      className={isMobile?"mobile-shop-finder":""}
      isMultiple={false}
      shops={shops}
      onAddNewShop={onUpdateFormShops}
    />
    <SubmitButton
      className={isMobile?"":"desktop-submit"}
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