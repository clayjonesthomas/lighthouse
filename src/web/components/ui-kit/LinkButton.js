import React, {PropTypes} from 'react'

import "./LinkButton.css"
const LinkButton = (
  {
    onClick,
    contents
  }) => (
  <a
    type="button"
    onClick={() => onClick()}
    className="link-button">
    {contents || "Log in"}
  </a>
)

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  contents: PropTypes.string
}

export default LinkButton