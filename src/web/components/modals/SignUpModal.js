import React, {PropTypes} from 'react'
import TextBox from '../ui-kit/TextBox'
import SubmitButton from '../ui-kit/SubmitButton'
import {Link} from 'react-router'
import './LoginModal.css'

import Modal from 'react-modal'
import {Grid, Row, Col, FormGroup} from 'react-bootstrap'
import {Component} from 'react'
import {GlobalModalStyle} from './GlobalModalStyle'

class SignUpModal extends Component {

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
        <p className='auth-title'> Login or Sign Up </p>
        <FormGroup>
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