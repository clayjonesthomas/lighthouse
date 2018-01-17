import React, {Component} from 'react'
import {connect} from 'react-redux'
import ModalHandler from 'scenes/modals/containers/ModalHandler'
import MenuHandler from 'features/Menu/MenuHandler'
import UserInfoHandler from 'features/UserInfo/UserInfoHandler'
import {Grid, Row, Col} from 'react-bootstrap'
import {isUserMobile} from 'features/UserInfo/UserActions'
import {pullUserInfo} from 'features/UserInfo/UserInfoActions'
import NotificationHandler from 'scenes/notifications/NotificationHandler'
import Footer from 'features/Footer/Footer'
import {showInfoIfAppropriate} from 'scenes/modals/AuthActions'

// mobile
import MobileMenuHandler from 'features/mobile/MobileMenu/MobileMenuHandler'
import "features/mobile/MobileMenu/MobileMenu.css"
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