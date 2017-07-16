import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'

const MyShopsPage =
  ({
     shops,
     onLike
   }) => (
    <div>
      {shops &&
        shops.map(shop => {
          return <ShopBox
            shop={shop}
            key={shop.key}
            onLike={() => onLike(shop.shop_url)}
          />
        })
      }
    </div>
  )

MyShopsPage.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired
}

export default MyShopsPage