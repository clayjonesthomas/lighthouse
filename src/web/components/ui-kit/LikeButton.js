import React, {PropTypes} from 'react'
import './LikeButton.css'

const LikeButton = ({onClick, isPressed}) => (
  <svg
    onClick={() => onClick()}
    width="35"
    height="35"
  >
    <path
      id="like"
      style={{"fill": isPressed ? "red" : "blue","stroke":"red","strokeWidth":0}}
      d="M 60 30
         a 30 30 0 0 1 0 60
         L 0 90 0 30
         a 30 30 0 0 1 60 0"
      transform="translate(5 -5) rotate(-45 20 20) scale(0.3 0.3)"
    />
  </svg>
)

LikeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPressed: PropTypes.bool.isRequired

}

export default LikeButton