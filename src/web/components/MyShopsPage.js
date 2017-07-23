import ShopBox from './ShopBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'

const MyShopsPage =
  ({
     myShops,
     onLike,
     areShopsLoaded,

     shops,
     onAddNewShop,
     onSubmitShops,
     onAddShopFinderRef,
     clearShopFinder
   }) => (
    <div>
      {!areShopsLoaded &&
        <Spinner/>
      }
      {areShopsLoaded &&
      <ShopFinder
        shops={shops}
        onAddNewShop={(shop) => {
          onAddNewShop(shop)
        }}
        onAddShopFinderRef={ref => onAddShopFinderRef(ref)}
        placeholder="search for a shop..."
      />
      }
      {areShopsLoaded &&
        <SubmitButton
          onClick={() => {
            onSubmitShops()
            clearShopFinder()
          }
        }
        />
      }
      {areShopsLoaded && myShops &&
        myShops.map(shop => {
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
  myShops: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
  areShopsLoaded: PropTypes.bool.isRequired
}

export default MyShopsPage