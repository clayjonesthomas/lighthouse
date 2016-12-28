import React, {PropTypes} from 'react'

const CancelButton = (onClick) => (
  <p
    onClick={onClick}>
    Cancel
  </p>
)

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CancelButton