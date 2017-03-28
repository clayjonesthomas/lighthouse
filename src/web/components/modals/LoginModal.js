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

const LoginModal = ({onCancel, onLogin, onSignUp}) => (
  <Modal
    isOpen={true}
    contentLabel='Login'
    style={LoginStyle}
  >
    <p className='auth-title'> Login or Sign Up </p>
    <FormGroup>
      <Col componentClass='login' sm={6}>
        <TextBox
          idName={LOGIN_USERNAME}
          placeholder="username"
        />
        <br/>
        <TextBox
          idName={LOGIN_PASSWORD}
          placeholder="password"
        />
        <br/>
        <SubmitButton
          onClick={() => onLogin(LOGIN_USERNAME, LOGIN_PASSWORD)}
        />
      </Col>
      <Col componentClass='sign-up' sm={6}>
        <TextBox
          idName={SIGN_UP_USERNAME}
          placeholder="choose a username"
        />
        <br/>
        <TextBox
          idName={SIGN_UP_PASSWORD_1}
          placeholder="enter a password"
        />
        <br/>
        <TextBox
          idName={SIGN_UP_PASSWORD_2}
          placeholder="confirm your password"
        />
        <br/>
        <SubmitButton
          onClick={ () =>
            onSignUp(SIGN_UP_USERNAME, SIGN_UP_PASSWORD_1, SIGN_UP_PASSWORD_2)}
        />
      </Col>
    </FormGroup>
  </Modal>
)

LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired

}

export default LoginModal