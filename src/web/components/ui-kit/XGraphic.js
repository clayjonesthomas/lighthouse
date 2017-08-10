import React, {PropTypes} from 'react'

import "./XGraphic.css"
const XGraphic = (
  {
    color,
    onClick
  }
) => (
  <svg
    className="x-graphic-svg"
    stroke={color ? color : '#000000'}
    width="50"
    height="50"
    onClick={onClick}
  >
    <line
      strokeWidth="4"
      x1="2"
      x2="30"
      y1="2"
      y2="30"/>
    <line
      strokeWidth="4"
      x1="2"
      x2="30"
      y1="30"
      y2="2"/>
  </svg>
)

XGraphic.PropTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default XGraphic