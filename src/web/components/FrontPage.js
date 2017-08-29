import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import ShopFinder from './ui-kit/ShopFinder/ShopFinder'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'
import MoreContentButton from "./ui-kit/MoreContentButton"

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
     username
  }) => (
  <div>
    {!arePostsLoaded &&
      <Spinner/>
    }
    <Grid>
      <Row>
        <Col md={6}>
          <div className={isMobile? "":"desktop-content-box"}>
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
              <div id={isMobile? "":"desktop-no-posts"}>
                You'll see some posts once you follow some stores. add some using the store finder!
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
              <ShopFinder isSearch="true"/>

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