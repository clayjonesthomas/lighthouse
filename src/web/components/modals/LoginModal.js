import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'

import Modal from 'react-modal'
import {Col, FormGroup} from 'react-bootstrap'

const LOGIN_USERNAME = "LOGIN_USERNAME"
const LOGIN_PASSWORD = "LOGIN_PASSWORD"
const SIGN_UP_USERNAME = "SIGN_UP_USERNAME"
const SIGN_UP_PASSWORD_1 = "SIGN_UP_PASSWORD_1"
const SIGN_UP_PASSWORD_2 = "SIGN_UP_PASSWORD_2"

// move me eventually
var LoginStyle = {
  overlay:{
    backgroundColor: 'rgba(0,0,0,.78)',
  },
  content:{
    borderRadius: '8px',
    backgroundColor: '#caffff'
  }
}

const LoginModal = (
  {
    onCancel,
    onLogin,
    onSignUp,
    refFunc
  }) => (
  <Modal
    isOpen={true}
    contentLabel='Login'
    style={LoginStyle}
  >
    <button
      type="button"
      onClick={() => onCancel()}>
      cancel
    </button>
    <p className='auth-title'> Login or Sign Up </p>
    <FormGroup>
      <Col componentClass='login' sm={6}>
        <TextBox
          placeholder="username"
          refFunc={ref => refFunc(LOGIN_USERNAME, ref)}
        />
        <br/>
        <TextBox
          placeholder="password"
          refFunc={ref => refFunc(LOGIN_PASSWORD, ref)}
        />
        <br/>
        <SubmitButton
          onClick={() => onLogin()}
        />
      </Col>
      <Col componentClass='sign-up' sm={6}>
        <TextBox
          placeholder="choose a username"
          refFunc={ref => refFunc(SIGN_UP_USERNAME, ref)}
        />
        <br/>
        <TextBox
          placeholder="enter a password"
          refFunc={ref => refFunc(SIGN_UP_PASSWORD_1, ref)}
        />
        <br/>
        <TextBox
          placeholder="confirm your password"
          refFunc={ref => refFunc(SIGN_UP_PASSWORD_2, ref)}
        />
        <br/>
        <SubmitButton
          onClick={ () =>
            onSignUp()}
        />
      </Col>
    </FormGroup>
  </Modal>
)

LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired

}

export default LoginModal