import React, {PropTypes} from 'react'
import './SubmitButton.css'

const SubmitButton = ({onClick}) => (
  <button
    type="button"
    onClick={onClick}
    className="submit-button">
    Submit
  </button>
)

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default SubmitButton