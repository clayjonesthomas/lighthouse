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


class LoginModal extends Component {

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
        <p className='auth-title'> Login </p>
        <FormGroup>
          <Col componentClass='login' sm={6}>
            <TextBox
              placeholder="username"
              refFunc={ref => this.props.onSaveRef(ref, LOGIN_USERNAME)}
            />
            <br/>
            <TextBox
              placeholder="password"
              refFunc={ref => this.props.onSaveRef(ref, LOGIN_PASSWORD)}
            />
            <br/>
            <SubmitButton
              onClick={() => this.props.onLogin()}
            />
          </Col>
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