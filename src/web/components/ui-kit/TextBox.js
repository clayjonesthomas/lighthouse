import React, {PropTypes} from 'react'
import './TextBox.css'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

const TextBox = (
  {
    idName,
    placeholder,
    label,
    className,
    refFunc
  }) => (
  <FormGroup controlId={idName}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      type="text"
      placeholder={placeholder}
      className={"text-box"+className}
      inputRef={ref => refFunc(ref)}
    />
  </FormGroup>
)

TextBox.propTypes = {
  idName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  refFunc: PropTypes.func.isRequired
}

export default TextBox