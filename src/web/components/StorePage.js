import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton'

const StorePage =
  ({
    name,
    website,
    likes,
    onLike,
    isLiked
  }) => (
    <div>
      {
        name + '   ' + website + '   ' + likes
      }
      <LikeButton
        onClick={() => onLike()}
        isPressed={isLiked}
      />
      <br/><br/>
    </div>
  )

StorePage.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
}

export default StorePage
