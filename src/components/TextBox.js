import React, {PropTypes} from 'react'

const TextBox = (onUpdate) => (
  <input
    onChange={onUpdate}>
  </input>
)

TextBox.propTypes = {
  onUpdate: PropTypes.func.isRequired
}

export default TextBox