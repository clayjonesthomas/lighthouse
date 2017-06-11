import React, { PropTypes } from 'react';
import ModalHandler from '../containers/ModalHandler.js'
import MenuHandler from '../containers/MenuHandler.js'

const Container = (props) =>
  <div>
    <ModalHandler
      modal={props.modal}/>
      {props.children}
    <MenuHandler/>
  </div>

export default Container