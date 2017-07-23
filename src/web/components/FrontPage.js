import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'

const FrontPage =
  ({posts,
    onSelectNewPost,
    username,
    onLike,
    arePostsLoaded,

     shops,
     onAddNewShop,
     onSubmitShops,
     onAddShopFinderRef,
     clearShopFinder
  }) => (
  <div>
    {!arePostsLoaded &&
      <Spinner/>
    }
    {arePostsLoaded && posts &&
      posts.map(post => {
        return <PostBox
          post={post}
          key={post.key}
          onLike={() => onLike(post.key)}
        />
      })
    }
    <ShopFinder
      shops={shops}
      onAddNewShop={(shop) => {
        onAddNewShop(shop)
      }}
      onAddShopFinderRef={ref => onAddShopFinderRef(ref)}
      placeholder="search for a shop..."
    />
    <SubmitButton
      onClick={() => {
        onSubmitShops()
        clearShopFinder()
      }
      }
    />
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired
}

export default FrontPage