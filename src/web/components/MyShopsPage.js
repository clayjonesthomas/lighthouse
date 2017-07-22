import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'

const MyShopsPage =
  ({
     shops,
     onLike,
     areShopsLoaded
   }) => (
    <div>
      {!areShopsLoaded &&
        <Spinner/>
      }
      {areShopsLoaded && shops &&
        shops.map(shop => {
          return <ShopBox
            shop={shop}
            key={shop.key}
            onLike={() => onLike(shop.key)}
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
  })).isRequired,
  areShopsLoaded: PropTypes.bool.isRequired
}

export default MyShopsPage