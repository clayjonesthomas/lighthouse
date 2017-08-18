import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton/LikeButton'
import Spinner from './ui-kit/Spinner'
import MoreContentButton from './ui-kit/MoreContentButton'
import {Grid, Col, Row} from 'react-bootstrap'
import PostBox from './PostBox'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'

import './StorePage.css'
const StorePage =
  ({
    name,
    website,
    likes,
    onLike,
    isLiked,

    username,
    deletePost,
    shopPosts,
    onLikePost,
    arePostsLoaded,
    onMorePosts,
    areMorePostsLoaded,
    areMorePosts,

    isMobile,
    shops,
    onAddNewShop,
    onSubmitShops,
    onAddShopFinderRef,
    clearShopFinder
  }) => (
    <Grid>
      <Row>
        <Col md={6}>
          <Row>
            <div className={isMobile?"":"desktop-shop-header"}>
              <h1>
                {name}
              </h1>
              <LikeButton
                onClick={() => onLike()}
                isPressed={isLiked}
                likes={likes}
              />
            </div>
          </Row>
          {!arePostsLoaded &&
            <Spinner/>
          }
          {arePostsLoaded && shopPosts &&
            shopPosts.map(post => {
              return <Row key={post.key}><PostBox
                post={post}
                post_key={post.key}
                onLike={() => onLikePost(post.key)}
                canDelete={post.canDelete}
                onDelete={deletePost}
              /></Row>
            })
          }
          <Row>
            {areMorePostsLoaded && areMorePosts &&
              <MoreContentButton
                onClick={onMorePosts}
                words="MORE POSTS"
              />
            }
            {!areMorePostsLoaded && areMorePosts &&
              <Spinner/>
            }
            {!areMorePosts &&
              <div>
                no more posts, come back later!
              </div>
            }
          </Row>
        </Col>
        {!isMobile &&
          <Col md={4}>
            <div className="shop-finder-container">
              <ShopFinder
                shops={shops}
                onAddNewShop={(shop) => {
                  onAddNewShop(shop)
                }}
                onAddShopFinderRef={ref => onAddShopFinderRef(ref)}
                placeholder="search for a shop..."
              />
              <SubmitButton
                contents="ADD TO LIKED SHOPS"
                onClick={
                  () => {
                    onSubmitShops()
                    clearShopFinder()
                  }
                }
              />
            </div>
          </Col>
        }
      </Row>
    </Grid>
  )

StorePage.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
}

export default StorePage
