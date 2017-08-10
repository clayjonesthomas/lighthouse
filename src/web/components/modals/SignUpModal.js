import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'
import {GlobalModalStyle} from './GlobalModalStyle'
import XGraphic from '../ui-kit/XGraphic'
import {SIGN_UP_USERNAME, SIGN_UP_PASSWORD_1, SIGN_UP_PASSWORD_2} from '../../actions/AuthActions'

import './LoginModal.css'

class SignUpModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Login'
        style={GlobalModalStyle}
      >
        <XGraphic
          onClick={() => this.props.onCancel()}
        />
        <p className='auth-title'> Sign Up </p>
        {this.props.message &&
          <span>{this.props.message}</span>
        }
        <FormGroup>
          <TextBox
            className="mobile-textbox"
            placeholder="username"
            refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_USERNAME)}
          />
          <br/>
          <TextBox
            className="mobile-textbox"
            placeholder="password"
            refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_PASSWORD_1)}
          />
          <br/>
          <TextBox
            className="mobile-textbox"
            placeholder="email"
            refFunc={ref => this.props.onSaveRef(ref, SIGN_UP_PASSWORD_2)}
          />
          <br/>
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