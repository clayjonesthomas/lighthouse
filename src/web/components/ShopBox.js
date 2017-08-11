import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton/LikeButton'
import {Link} from 'react-router'

import "./ShopBox.css"
const ShopBox = (
  {
    shop,
    onLike
  }) => (
  <div>
    <Link
      to={"/store/"+shop.key}
      className="shop-name">
      {
        shop.name
      }
    </Link>
    <a
      href={"http://" + shop.website}
      className="go-to-site-link"
    >
      Go to site...
    </a>
    <div className="shop-options">
      {
        <LikeButton
          onClick={() => onLike()}
          isPressed={shop.isLiked}
          likes={shop.likes}
          className="shop-like"
          areLikesLeft={true}
        />
      }
    </div>
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