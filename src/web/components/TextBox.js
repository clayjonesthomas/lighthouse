import React, {PropTypes} from 'react'

const TextBox = ({idName}) => (
  <input
    type="text"
    id={idName}>
  </input>
)

TextBox.propTypes = {
  idName: PropTypes.string.isRequired
}

export default TextBox