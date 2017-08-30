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
          className="x-modal"
          width={isMobile?"60":"30"}
          height={isMobile?"60":"30"}
          onClick={() => onCancel()}
        />
        <h1>{"Welcome to Lightho.us"}</h1>
        <p>
          {
            "Lightho.us gathers all the clothing sales " +
            "from across the web into one place. With Lightho.us " +
            "you can browse sales from all stores or just " +
            "the ones you like. You can also search for new " +
            "shops, save sales for later, and so much more. " +
            "We hope you enjoy it!"
          }
        </p>
        <SubmitButton
          onClick={onShowSignUp}
          contents="Sign up"
        />
        <span>or</span>
        <LinkButton
          onClick={onShowLogin}
          contents="Log in"/>
        <SubmitButton
          onClick={onCancel}
          contents="Maybe later"
        />
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