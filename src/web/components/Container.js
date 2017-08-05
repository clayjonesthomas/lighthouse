import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ModalHandler from '../containers/ModalHandler.js'
import MenuHandler from '../containers/MenuHandler.js'
import UserInfoHandler from '../containers/UserInfoHandler.js'
import {Grid, Row, Col} from 'react-bootstrap'
import {isUserMobile} from '../actions/UserActions'

class Container extends Component {

  componentDidMount () {
    this.props.isUserMobile()
  }

  render() {

    return (
      <div>
        <UserInfoHandler/>
        <ModalHandler
          modal={this.props.modal}
        />
        <Grid>
          <Row>
            <Col md={2}>
              <MenuHandler/>
            </Col>
            <Col md={10}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    isUserMobile: () => dispatch(isUserMobile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)