import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/deprecated/LikeButton'

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
    isLiked: PropTypes.bool.isRequired
  }).isRequired,
  onLike: PropTypes.func.isRequired
}

export default ShopBox