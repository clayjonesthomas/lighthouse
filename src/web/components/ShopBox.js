import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton'

const ShopBox = (
  {
    shop,
    onLike
  }) => (
  <div style={{'borderStyle':'solid'}}>
    {
      shop.name + '   ' + shop.website + '   ' + shop.likes
    }
    {
      <LikeButton
        onClick={() => onLike()}
        isPressed={shop.isLiked}
      />
    }
  </div>
)

ShopBox.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    onLike: PropTypes.func.isRequired,
    isLiked: PropTypes.bool.isRequired
  }).isRequired
}

export default ShopBox