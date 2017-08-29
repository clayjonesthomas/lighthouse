import React, {PropTypes} from 'react'
import SubmitButton from './ui-kit/SubmitButton'
import TextBox from './ui-kit/TextBox'
import ShopFinder from './ui-kit/ShopFinder/ShopFinder'
import {ControlLabel} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import ErrorMessages from './ui-kit/ErrorMessages'

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
    isMobile,
    errors
  }) => (
  <Col md={8} className={isMobile?"":"form-block-desktop"}>
    <div
      id={isMobile?"new-post-form":"new-post-form-desktop"}
      className={isMobile?"":"desktop-content-box"}>
      <span className={isMobile?"":"submit-sale-desktop"}>
        Submit a Sale
      </span>
      {errors.length > 0 &&
        <ErrorMessages
          className={isMobile?
            "mobile-error-messages":"desktop-error-messages"}
          messages={errors}/>
      }
      <div className={isMobile?"":"form-contents-desktop"}>
        <TextBox
          className={isMobile?"mobile-textbox":""}
          refFunc={ref => onSaveTitleRef(ref)}
          label="Sale Specifics: "
          componentClass={"textarea"}
        />
        <ControlLabel className={"text-box-label label-new-shop-finder "
          +(isMobile?"":"label-new-shop-desktop")}>
          Shop:
        </ControlLabel>
        <ShopFinder isSearch={true}/>
        <SubmitButton
          className={isMobile?"":"desktop-submit"}
          onClick={() => onSubmit()}
        />
      </div>
    </div>
  </Col>
)

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaveTitleRef: PropTypes.func.isRequired,
  onUpdateFormShops: PropTypes.func.isRequired
}

export default NewPostForm