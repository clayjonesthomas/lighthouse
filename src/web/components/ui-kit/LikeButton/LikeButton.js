import React, {PropTypes} from 'react'
import EmptyLikeButton from "./EmptyLikeButton"
import FullLikeButton from "./FullLikeButton"

import "./LikeButton.css"
const LikeButton = (
  {
    isPressed,
    onClick,
    size,
    likes,
    className,
    areLikesLeft
  }
) => (
  <span
    className={"like-svg " + className}
    onClick={onClick}>
    {areLikesLeft &&
      <div
        className="like-count"
        style={isPressed ?
          {"fill":"#ff4759"} : {"fill": "#0055ff"}}
      >
        {
          likes
        }
      </div>
    }
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
    {!areLikesLeft &&
      <div
        className="like-count"
        style={isPressed ?
          {"fill":"#ff4759"} : {"fill": "#0055ff"}}
      >
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