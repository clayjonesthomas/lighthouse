import React, {PropTypes} from 'react'
import './TextBox.css'

const TextBox = ({idName}) => (
  <input
    type="text"
    id={idName}
    className="text-box">
  </input>
)

TextBox.propTypes = {
  idName: PropTypes.string.isRequired
}

export default TextBox