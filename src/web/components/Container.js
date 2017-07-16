import React, { PropTypes } from 'react';
import ModalHandler from '../containers/ModalHandler.js'
import MenuHandler from '../containers/MenuHandler.js'
import UserInfoHandler from '../containers/UserInfoHandler.js'

const Container = (props) =>
  <div>
    <UserInfoHandler/>
    <ModalHandler
      modal={props.modal}
    />
      {props.children}
    <MenuHandler/>
  </div>

export default Container