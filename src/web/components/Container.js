import React, { PropTypes } from 'react';
import ModalHandler from '../containers/ModalHandler.js'

const Container = (props) =>
  <div>
    <ModalHandler
      modal={props.modal}/>
    {props.children}
  </div>

export default Container