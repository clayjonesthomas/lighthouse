import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'
import ShopFinder from './ui-kit/ShopFinder'

import "./FrontPage.css"
const MyPostsPage =
  ({
     myPosts,
     onLike,
     areMyPostsLoaded,
     deletePost,
     areMoreMyPostsLoaded,
     getMoreMyPosts,
     areMoreMyPosts,
     isMobile,

     shops,
     onAddNewShop,
     onSubmitShops,
     onAddShopFinderRef,
     clearShopFinder
   }) => (
    <div>
      {!areMyPostsLoaded &&
      <Spinner/>
      }
      <Grid>
        <Row>
          <Col md={6}>
            <Row>
              <h1 className={isMobile?"mobile-h1":"desktop-h1"}>
                My Posts
              </h1>
            </Row>
            <div className={isMobile? "":"desktop-content-box"}>
              {areMyPostsLoaded && myPosts &&
              myPosts.map(post => {
                return <Row key={post.key}>
                  <PostBox
                  post={post}
                  post_key={post.key}
                  onLike={() => onLike(post.key)}
                  canDelete={post.canDelete}
                  onDelete={deletePost}
                /></Row>
              })
              }
              {areMyPostsLoaded && !myPosts &&
                "Posts you have liked will end up here"
              }
              {!areMoreMyPostsLoaded &&
                <Spinner/>
              }
              {areMoreMyPostsLoaded && areMoreMyPosts &&
                <SubmitButton
                  onClick={getMoreMyPosts}
                  contents="More Posts"
                />
              }
            </div>
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
    </div>
  )

MyPostsPage.propTypes = {
  areMyPostsLoaded: PropTypes.bool.isRequired
}

export default MyPostsPage