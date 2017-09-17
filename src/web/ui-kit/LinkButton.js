import React, {PropTypes} from 'react'

import "./LinkButton.css"
const LinkButton = (
  {
    className,
    onClick,
    contents
  }) => (
  <a
    type="button"
    onClick={() => onClick()}
    className={"link-button " + (className || "")}>
    {contents || "Log in"}
  </a>
)

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  contents: PropTypes.string
}

export default LinkButton