import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton'

const StorePage =
  ({
    name,
    website,
    likes,
    timestamp,
    onLike,
    isLiked
  }) => (
    <div>
      {
        name + '   ' + website + '   ' + likes + '   ' + timestamp
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
  timestamp: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
}

export default StorePage
