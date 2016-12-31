import React, {PropTypes} from 'react'

const CancelButton = ({onClick}) => (
  <button
    type="button"
    onClick={() => onClick()}>
    Cancel
  </button>
)

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CancelButton