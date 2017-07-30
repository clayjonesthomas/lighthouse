import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'

const FrontPage =
  ({
     posts,
     onSelectNewPost,
     username,
     onLike,
     arePostsLoaded,
     onMorePosts,
     areMorePostsLoaded,
     areMorePosts,

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
              return <PostBox
                post={post}
                key={post.key}
                onLike={() => onLike(post.key)}
              />
            })
          }
          {arePostsLoaded && !posts.length &&
            <span>You'll see some posts once you follow some stores. add some here! --></span>
          }
          <Row>
            {areMorePostsLoaded && areMorePosts &&
              <SubmitButton
                onClick={() => {
                  onMorePosts()
                }}
                contents="More Posts"
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