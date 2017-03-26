import React, {PropTypes} from 'react'
import TextBox from '../TextBox'
import SubmitButton from '../SubmitButton'
import CancelButton from '../CancelButton'
import {Link} from 'react-router'
import './LoginModal'

const USERNAME = "username"
const PASSWORD = "password"

const LoginModal = ({onCancel, onSubmit, onSignUp}) => (
  <div class="login-modal">
     <p> Login or <Link to="/" onClick={onSignUp}> Sign Up </Link> </p>
    <TextBox
      idName={USERNAME}
    />
    <TextBox
      idName={PASSWORD}
    />
    <CancelButton
      onClick={onCancel}
      />
    <SubmitButton
      onClick={() => onSubmit(USERNAME, PASSWORD)}
    />
  </div>
)

LoginModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired

}

export default LoginModal