import PostBox from '../../features/PostBox/PostBox'
import React, {PropTypes} from 'react'
import Spinner from 'ui-kit/Spinner'
import ShopFinder, {FINDER_SEARCH}
  from 'features/ShopFinder/ShopFinder'
import {Grid, Col, Row} from 'react-bootstrap'
import MoreContentButton from "ui-kit/MoreContentButton"

import "./FrontPage.css"
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

     fireMustSignIn,
     username,
     isMyFeed
  }) => (
  <div>
    {!arePostsLoaded &&
      <Spinner/>
    }
    <Grid>
      <Row>
        <Col md={6} className={isMobile?"":"mid-block-desktop"}>
          {isMyFeed &&
            <Row>
              <h1 id="my-feed-title">
                My Feed
              </h1>
            </Row>
          }
          <div className={isMobile? "":
            isMyFeed?"desktop-content-feed-box":"desktop-content-box"}>
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
            {arePostsLoaded && !posts.length && isMyFeed &&
              <div id={isMobile? "":"desktop-no-posts"}>
                You'll see some posts once you like some stores. The posts from your liked stores will show up here!
              </div>
            }
          </div>
          <Row>
            {arePostsLoaded && posts.length !== 0 && areMorePostsLoaded && areMorePosts &&
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
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired
}

export default FrontPage