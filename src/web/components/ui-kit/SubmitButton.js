import React, {PropTypes} from 'react'

import './SubmitButton.css'
const SubmitButton = (
  {
    onClick,
    contents
  }) => (
  <button
    type="button"
    onClick={() => onClick()}
    className="submit-button">
    {contents || "SUBMIT"}
  </button>
)

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  contents: PropTypes.string
}

export default SubmitButton