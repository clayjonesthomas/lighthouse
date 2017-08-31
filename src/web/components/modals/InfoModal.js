import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import LinkButton from '../ui-kit/LinkButton'
import {GlobalModalStyle, DesktopGlobalModalStyle} from './GlobalModalStyle'
import Modal from 'react-modal'
import {Component} from 'react'
import XGraphic from '../ui-kit/XGraphic'

import "./ModalStyle.css"
import './InfoModal.css'
class InfoModal extends Component {

  render () {
    const {
      onCancel,
      onShowLogin,
      onShowSignUp,
      isMobile
    } = this.props
    return (
      <Modal
        isOpen={true}
        contentLabel='Info'
        style={isMobile?GlobalModalStyle:DesktopGlobalModalStyle}
      >
        <XGraphic
          className="x-modal x-info"
          width={isMobile?"60":"30"}
          height={isMobile?"60":"30"}
          onClick={() => onCancel()}
        />
        <h1 id="info-modal-title">
          {"Welcome to Lightho.us"}
        </h1>
        <p id="info-paragraph">
          {
            "Lightho.us gathers all the clothing sales " +
            "from across the web into one place. With Lightho.us " +
            "you can browse sales from all stores or just " +
            "the ones you like. You can also search for new " +
            "shops, save sales for later, and so much more. " +
            "We hope you enjoy it!"
          }
        </p>
        <div className="info-buttons">
          <div id="sign-up-button-wrapper">
            <SubmitButton
              onClick={onShowSignUp}
              contents="Sign up"
              className="info-submit-button"
            />
            <div id="info-login">
              or&nbsp;
              <LinkButton
                onClick={onShowLogin}
                contents="Log in"
                className="info-link"
              />
            </div>
          </div>
          <SubmitButton
            onClick={onCancel}
            contents="Maybe later"
            className="info-cancel-button"
          />
        </div>
      </Modal>
    )
  }
}


InfoModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onShowLogin: PropTypes.func.isRequired,
  onShowSignUp: PropTypes.func.isRequired
}

export default InfoModal