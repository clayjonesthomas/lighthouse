import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalHandler from '../containers/ModalHandler.js'
import MenuHandler from '../containers/MenuHandler.js'
import UserInfoHandler from '../containers/UserInfoHandler.js'
import {Grid, Row, Col} from 'react-bootstrap'
import {isUserMobile} from '../actions/UserActions'
import {pullUserInfo} from '../actions/UserInfoActions'
import NotificationHandler from '../containers/NotificationHandler'
import Footer from './Footer'
import {showInfoIfAppropriate} from '../actions/AuthActions'

// mobile
import MobileMenuHandler from '../containers/MobileMenuHandler'
import "./MobileMenu.css"
import "./Container.css"
class Container extends Component {

  componentDidMount () {
    this.props.isUserMobile()
    this.props.getUserInfo()
    this.props.showInfoModalIfAppropriate()
  }

  render() {

    return (
      <div id="body-container-wrapper">
        <div id="body-container-contents">
          <ModalHandler
            modal={this.props.modal}
          />
          <NotificationHandler/>
          {this.props.isMobile &&
            <MobileMenuHandler/>
          }
          {this.props.isMobile &&
            <Grid id="mobile-children-grid">
              <Row>
                {this.props.children}
              </Row>
            </Grid>
          }
          {!this.props.isMobile &&
            <Grid>
              <Row>
                <UserInfoHandler/>
              </Row>
              <Row>
                <Col md={2}>
                  <MenuHandler/>
                </Col>
                {
                  this.props.children
                }
              </Row>
            </Grid>
          }
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.serverMessage,
    isMobile: state.isMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isUserMobile: () => dispatch(isUserMobile()),
    getUserInfo: () => dispatch(pullUserInfo()),
    showInfoModalIfAppropriate: () => {
      dispatch(showInfoIfAppropriate())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)