import React, {PropTypes} from 'react'
import TextBox from 'ui-kit/TextBox'
import SubmitButton from 'ui-kit/SubmitButton'
import './LoginModal.css'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'
import {GlobalModalStyle, DesktopGlobalModalStyle} from './GlobalModalStyle'
import XGraphic from 'ui-kit/XGraphic'
import {SIGN_UP_USERNAME, SIGN_UP_PASSWORD, SIGN_UP_EMAIL} from '../AuthActions'
import ErrorMessages from 'ui-kit/ErrorMessages'

import "./ModalStyle.css"
import "./SignUpModal.css"
class SignUpModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Sign up'
        style={this.props.isMobile?GlobalModalStyle:DesktopGlobalModalStyle}
        onRequestClose={this.props.onCancel}
      >
        <XGraphic
          className="x-modal"
          width={this.props.isMobile?"60":"30"}
          height={this.props.isMobile?"60":"30"}
          onClick={() => this.props.onCancel()}
        />
        <FormGroup
          className="sign-up-form-group">
          <p className={"auth-title " + (this.props.isMobile?
            "auth-title-mobile":"auth-title-desktop")}>
            Sign Up
          </p>
          {this.props.messages.length > 0 &&
          <ErrorMessages
            className={(this.props.isMobile?
              "mobile-error-messages":"desktop-error-messages")}
            messages={this.props.messages}/>
          }
          <div className={(this.props.isMobile?"mobile-form-contents":"modal-text-boxes")}>
            <TextBox
              className={"modal-textbox " + (this.props.isMobile?
                "mobile-textbox":"desktop-textbox")}
              classNameLabel={(this.props.isMobile?
                "mobile-textbox-label":"desktop-textbox-label")}
              label="username"
              refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_USERNAME)}
            />
            <TextBox
              className={"modal-textbox " + (this.props.isMobile?
                "mobile-textbox":"desktop-textbox")}
              classNameLabel={(this.props.isMobile?
                "mobile-textbox-label":"desktop-textbox-label")}
              label="password"
              inputType="password"
              refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_PASSWORD)}
            />
            <TextBox
              className={"modal-textbox " + (this.props.isMobile?
                "mobile-textbox":"desktop-textbox")}
              classNameLabel={(this.props.isMobile?
                "mobile-textbox-label":"desktop-textbox-label")}
              label="email"
              refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_EMAIL)}
              onEnter={this.props.onSignUp}
            />
          </div>
          <SubmitButton
            onClick={() => this.props.onSignUp()}
          />
        </FormGroup>
      </Modal>
    )
  }
}


SignUpModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  message: PropTypes.string
}

export default SignUpModal