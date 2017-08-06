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
import {USERNAME, PASSWORD_1, PASSWORD_2} from '../../containers/LoginHandler'

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
        <p className='auth-title'> Login or Sign Up </p>
        <FormGroup>
          <Col componentClass='sign-up' sm={6}>
            <TextBox
              placeholder="choose a username"
              refFunc={ref => this.props.onSaveRef(ref, USERNAME)}
            />
            <br/>
            <TextBox
              placeholder="enter a password"
              refFunc={ref => this.props.onSaveRef(ref, PASSWORD_1)}
            />
            <br/>
            <TextBox
              placeholder="confirm your password"
              refFunc={ref => this.props.onSaveRef(ref, PASSWORD_2)}
            />
            <br/>
            <SubmitButton
              onClick={() => this.props.onSignUp()}
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