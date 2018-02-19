import React, {PropTypes} from 'react'

const XButton = (
  {
    color,
    onClick,
    className,
    size
  }
) => (
  <svg
    className={"x-graphic-svg " + className}
    stroke={color ? color : '#000000'}
    width={60*size}
    height={60*size}
    viewBox="0 0 32 32"
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

XButton.PropTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
  className: PropTypes.string

}

export default XButton
