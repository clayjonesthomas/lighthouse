import React, {PropTypes} from 'react'

const SubmitButton = ({onClick}) => (
  <button
    type="button"
    onClick={onClick}>
    Submit
  </button>
)

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default SubmitButton