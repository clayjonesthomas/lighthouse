import React, {PropTypes} from 'react'

const SubmitButton = (onClick) => (
  <p
    onClick={onClick}>
    Submit
  </p>
)

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default SubmitButton