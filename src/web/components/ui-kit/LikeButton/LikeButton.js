import React, {PropTypes} from 'react'
import EmptyLikeButton from "./EmptyLikeButton"
import FullLikeButton from "./FullLikeButton"

import "./LikeButton.css"
const LikeButton = (
  {
    isPressed,
    onClick,
    size,
    likes
  }
) => (
  <span
    className="like-svg"
    onClick={onClick}>
    {!isPressed &&
      <EmptyLikeButton
        width={size}
        height={size}
      />
    }
    {isPressed &&
      <FullLikeButton
        width={size}
        height={size}
      />
    }
    {
      <div className="like-count">
        {
          likes
        }
      </div>
    }
  </span>
)

LikeButton.PropTypes = {
  onClick: PropTypes.func.isRequired,
  isPressed: PropTypes.bool.isRequired
}

export default LikeButton