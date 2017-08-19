import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'
import {GlobalModalStyle, DesktopGlobalModalStyle} from './GlobalModalStyle'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'
import XGraphic from '../ui-kit/XGraphic'
import {LOGIN_USERNAME, LOGIN_PASSWORD} from '../../actions/AuthActions'
import ErrorMessages from '../ui-kit/ErrorMessages'

import "./ModalStyle.css"
import './LoginModal.css'
class LoginModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Login'
        style={this.props.isMobile?GlobalModalStyle:DesktopGlobalModalStyle}
      >
        <XGraphic
          className="x-modal"
          width={this.props.isMobile?"60":"30"}
          height={this.props.isMobile?"60":"30"}
          onClick={() => this.props.onCancel()}
        />
        <FormGroup>
          <p className={"auth-title " + (this.props.isMobile?
            "auth-title-mobile":"auth-title-desktop")}>
            Login
          </p>
          {this.props.messages.length > 0 &&
            <ErrorMessages
              className={(this.props.isMobile?
                "mobile-error-messages":"desktop-error-messages")}
              messages={this.props.messages}/>
          }
          <div className={(this.props.isMobile?"mobile-form-contents":"text-boxes")}>
            <TextBox
              className={"modal-textbox " + (this.props.isMobile?
                "mobile-textbox":"desktop-textbox")}
              classNameLabel={(this.props.isMobile?
                "mobile-textbox-label":"desktop-textbox-label")}
              label="username"
              refFunc={ref => this.props.onSaveRef(ref, LOGIN_USERNAME)}
            />
            <TextBox
              className={"modal-textbox " + (this.props.isMobile?
                "mobile-textbox":"desktop-textbox")}
              classNameLabel={(this.props.isMobile?
                "mobile-textbox-label":"desktop-textbox-label")}
              label="password"
              inputType="password"
              refFunc={ref => this.props.onSaveRef(ref, LOGIN_PASSWORD)}
            />
          </div>
          <SubmitButton
            onClick={() => this.props.onLogin()}
          />
        </FormGroup>
      </Modal>
    )
  }
}


LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

export default LoginModal