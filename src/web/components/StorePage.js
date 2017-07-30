import React, {PropTypes} from 'react'
import LikeButton from './ui-kit/LikeButton'
import Spinner from './ui-kit/Spinner'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'
import PostBox from './PostBox'

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
    areMorePosts


  }) => (
    <Grid>
      <Row>
        {
          name + '   ' + website + '   ' + likes
        }
        <LikeButton
          onClick={() => onLike()}
          isPressed={isLiked}
        />
      </Row>
      <Row>
        <Col md={8}>
          {!arePostsLoaded &&
            <Spinner/>
          }
          {arePostsLoaded && shopPosts &&
            shopPosts.map(post => {
              return <Row><PostBox
                post={post}
                key={post.key}
                post_key={post.key}
                onLike={() => onLikePost(post.key)}
                canDelete={post.canDelete}
                onDelete={deletePost}
              /></Row>
            })
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
