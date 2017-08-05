import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'
import {GlobalModalStyle} from './GlobalModalStyle'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'


class LoginModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Login'
        style={GlobalModalStyle}
      >
        <button
          type="button"
          onClick={() => this.props.onCancel()}>
          cancel
        </button>
        <p className='auth-title'> Login </p>
        <FormGroup>
          <Col componentClass='login' sm={6}>
            <TextBox
              placeholder="username"
              refFunc={ref => {
              this.login_username = ref
              }}
            />
            <br/>
            <TextBox
              placeholder="password"
              refFunc={ref => this.login_password = ref}
            />
            <br/>
            <SubmitButton
              onClick={() => this.props.onLogin(this.login_username.value,
                this.login_password.value)}
            />
          </Col>
        </FormGroup>
      </Modal>
    )
  }
}


LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired

}

export default LoginModal