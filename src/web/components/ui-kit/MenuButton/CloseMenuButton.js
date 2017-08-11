//from FlatIcon, purchased with subscription
import React from 'react'

const CloseMenuButton = (
  {
    width,
    height,
    onClick
  }
) => (

  <svg
    x="0px"
    y="0px"
    width="50px"
    height="50px"
    viewBox="0 0 49.656 49.656"
    onClick={onClick}
  >
    <g>
      <polygon
        points="48.242,35.122 45.414,37.95 24.828,17.364 4.242,37.95 1.414,35.122 24.828,11.707 	"/>
      <path
        d="M45.414,39.363L24.828,18.778L4.242,39.363L0,35.121l24.828-24.828l24.828,24.828L45.414,39.363z
         M24.828,15.95l20.586,20.585l1.414-1.414l-22-22l-22,22l1.414,1.414L24.828,15.95z"/>
    </g>
  </svg>


)

export default CloseMenuButton