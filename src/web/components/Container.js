import React, { PropTypes } from 'react';
import ModalHandler from '../containers/ModalHandler.js'
import MenuHandler from '../containers/MenuHandler.js'
import UserInfoHandler from '../containers/UserInfoHandler.js'
import {Grid, Row, Col} from 'react-bootstrap'
const Container =
  ({
     children,
     modal
  }) => (
  <div>
    <UserInfoHandler/>
    <ModalHandler
      modal={modal}
    />
    <Grid>
      <Row>
        <Col md={2}>
          <MenuHandler/>
        </Col>
        <Col md={10}>
          {children}
        </Col>
      </Row>
    </Grid>
  </div>
  )


export default Container