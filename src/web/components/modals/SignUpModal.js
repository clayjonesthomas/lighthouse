import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'

import Modal from 'react-modal'
import {Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'

const LOGIN_USERNAME = "LOGIN_USERNAME"
const LOGIN_PASSWORD = "LOGIN_PASSWORD"
const SIGN_UP_USERNAME = "SIGN_UP_USERNAME"
const SIGN_UP_PASSWORD_1 = "SIGN_UP_PASSWORD_1"
const SIGN_UP_PASSWORD_2 = "SIGN_UP_PASSWORD_2"

// move me eventually
var LoginStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.78)',
  },
  content: {
    borderRadius: '8px',
    backgroundColor: '#caffff'
  }
}

class SignUpModal extends Component {

  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel='Login'
        style={LoginStyle}
      >
        <button
          type="button"
          onClick={() => this.props.onCancel()}>
          cancel
        </button>
        <p className='auth-title'> Login or Sign Up </p>
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
          <Col componentClass='sign-up' sm={6}>
            <TextBox
              placeholder="choose a username"
              refFunc={ref => this.sign_up_username = ref}
            />
            <br/>
            <TextBox
              placeholder="enter a password"
              refFunc={ref => this.sign_up_password_1 = ref}
            />
            <br/>
            <TextBox
              placeholder="confirm your password"
              refFunc={ref => this.sign_up_password_2 = ref}
            />
            <br/>
            <SubmitButton
              onClick={ () =>
                this.props.onSignUp(this.sign_up_username.value,
                  this.sign_up_password_1.value,
                  this.sign_up_password_2.value)}
            />
          </Col>
        </FormGroup>
      </Modal>
    )
  }
}


SignUpModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  showSignUp: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired

}

export default SignUpModal