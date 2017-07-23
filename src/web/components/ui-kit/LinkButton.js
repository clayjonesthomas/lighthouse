import React, {PropTypes} from 'react'

const LinkButton = ({onClick}) => (
  <button
    type="button"
    onClick={() => onClick()}
    className="link-button">
    Log out
  </button>
)

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default LinkButton