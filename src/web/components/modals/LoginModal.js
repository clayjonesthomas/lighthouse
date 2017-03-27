import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import CancelButton from '../CancelButton'
import {Link} from 'react-router'
import './LoginModal.css'

import Modal from 'react-modal'

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
    <div className='login'>
      <TextBox
        idName={LOGIN_USERNAME}
      />
      <br/>
      <TextBox
        idName={LOGIN_PASSWORD}
      />
      <br/>
      <SubmitButton
        onClick={() => onLogin(LOGIN_USERNAME, LOGIN_PASSWORD)}
      />
    </div>
    <div className='sign-up'>
      <TextBox
        idName={SIGN_UP_USERNAME}
      />
      <br/>
      <TextBox
        idName={SIGN_UP_PASSWORD_1}
      />
      <br/>
      <TextBox
        idName={SIGN_UP_PASSWORD_2}
      />
      <br/>
      <SubmitButton
        onClick={ () =>
          onSignUp(SIGN_UP_USERNAME, SIGN_UP_PASSWORD_1, SIGN_UP_PASSWORD_2)}
      />
    </div>
  </Modal>
)

LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired

}

export default LoginModal