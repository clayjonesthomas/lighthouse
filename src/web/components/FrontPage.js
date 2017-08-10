import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'
import MoreContentButton from "./ui-kit/MoreContentButton"

const FrontPage =
  ({
     posts,
     onLike,
     arePostsLoaded,
     onMorePosts,
     areMorePostsLoaded,
     areMorePosts,
     deletePost,
     isMobile,

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
    <Grid>
      <Row>
        <Col md={8}>
          {arePostsLoaded && posts &&
            posts.map(post => {
              return <Row key={post.key}><PostBox
                post={post}
                post_key={post.key}
                onLike={() => onLike(post.key)}
                canDelete={post.canDelete}
                onDelete={deletePost}
              /></Row>
            })
          }
          {arePostsLoaded && !posts.length &&
            <span>You'll see some posts once you follow some stores. add some using the store finder!</span>
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
          <Col md={2}>
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
          </Col>
        }
      </Row>
    </Grid>
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired
}

export default FrontPage