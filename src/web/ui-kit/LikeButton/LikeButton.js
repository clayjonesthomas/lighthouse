import React, {PropTypes} from 'react'
import EmptyLikeButton from "./EmptyLikeButton"
import FullLikeButton from "./FullLikeButton"
import {connect} from 'react-redux'

import "./LikeButton.css"
const LikeButton = (
  {
    isPressed,
    onClick,
    size,
    likes,
    className,
    areLikesLeft,
    isMobile
  }
) => (
  <span
    className={"like-svg " + (className || "")}
    onClick={onClick}>
    {areLikesLeft &&
      <div
        className={"like-count like-count-left "
          + (isMobile ? "like-count-mobile" : "like-count-desktop")}
        style={isPressed ?
          {"color":"#ff4759"} : {"color": "#0055ff"}}
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
        className={"like-count like-count-right "
        + (isMobile ? "like-count-mobile " : "like-count-desktop ")}
        style={isPressed ?
          {"color":"#ff4759"} : {"color": "#0055ff"}}
      >
        {
          likes
        }
      </div>
    }
  </span>
)

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    isMobile: state.isMobile
  })
}

export default connect(
  mapStateToProps
)(LikeButton)