import React, {PropTypes} from 'react'
import './TextBox.css'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

const TextBox = ({idName, placeholder, label, className}) => (
  <FormGroup controlId={idName}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      type="text"
      placeholder={placeholder}
      className={"text-box"+className}
    />
  </FormGroup>
  // <input
  //   type="text"
  //   id={idName}
  //   className="text-box">
  // </input>
)

TextBox.propTypes = {
  idName: PropTypes.string.isRequired
}

export default TextBox