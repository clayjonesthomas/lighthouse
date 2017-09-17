import React, {PropTypes} from 'react'
import LikeButton from 'ui-kit/LikeButton/LikeButton'
import Spinner from 'ui-kit/Spinner'
import MoreContentButton from 'ui-kit/MoreContentButton'
import {Grid, Col, Row} from 'react-bootstrap'
import PostBox from './PostBox'
import ShopFinder, {FINDER_SEARCH}
  from 'ui-kit/ShopFinder/ShopFinder'

import './ShopPage.css'
const ShopPage =
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

    isMobile
  }) => (
    <Grid>
      <Row>
        <Col md={6} className={isMobile?"":"mid-block-desktop"}>
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
              <ShopFinder finderType={FINDER_SEARCH}/>
            </div>
          </Col>
        }
      </Row>
    </Grid>
  )

ShopPage.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
}

export default ShopPage
