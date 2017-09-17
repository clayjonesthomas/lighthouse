import React, {PropTypes} from 'react'
import LikeButton from 'ui-kit/LikeButton/LikeButton'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import "./PostBox.css"
import "./ShopBox.css"
const ShopBox = (
  {
    shop,
    onLike,
    isMobile
  }) => (
  <div className="shop-box">
    <div className="shop-box-inner">
      <div className="shop-title-bar">
        <Link
          to={"/shop/"+shop.key}
          className="shop-name">
          {
            shop.name
          }
        </Link>
        <a
          href={shop.website}
          className="go-to-site-link"
        >
          Go to site...
        </a>
      </div>
      <div className="shop-options clear-fix">
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
    <hr className={isMobile ? "post-line-break" :
      "post-line-break-desktop"}/>
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

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isMobile: state.isMobile
  })
}


export default connect(
  mapStateToProps
)(ShopBox)