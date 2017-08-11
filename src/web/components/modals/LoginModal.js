import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'
import {GlobalModalStyle} from './GlobalModalStyle'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'
import XGraphic from '../ui-kit/XGraphic'
import {LOGIN_USERNAME, LOGIN_PASSWORD} from '../../actions/AuthActions'

import "./ModalStyle.css"
import './LoginModal.css'
class LoginModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Login'
        style={GlobalModalStyle}
      >
        <XGraphic
          className="x-modal"
          onClick={() => this.props.onCancel()}
        />
        <FormGroup>
          <p className='auth-title'> Login </p>
          {this.props.message &&
            <span>{this.props.message}</span>
          }
          <TextBox
            className="mobile-textbox"
            label="username"
            refFunc={ref => this.props.onSaveRef(ref, LOGIN_USERNAME)}
          />
          <TextBox
            className="mobile-textbox"
            label="password"
            inputType="password"
            refFunc={ref => this.props.onSaveRef(ref, LOGIN_PASSWORD)}
          />
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