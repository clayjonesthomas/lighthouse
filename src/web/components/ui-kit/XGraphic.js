import React, {PropTypes} from 'react'

const XGraphic = (
  {
    color
  }
) => (
  <svg
    stroke={color}
    viewBox="0 0 32 32">
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
  color: PropTypes.string.isRequired
}

export default XGraphic