import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import SubmitButton from './ui-kit/SubmitButton'
import {Grid, Col, Row} from 'react-bootstrap'

const MyPostsPage =
  ({
     myPosts,
     onLike,
     areMyPostsLoaded,
     deletePost,
     areMoreMyPostsLoaded,
     getMoreMyPosts,
     areMoreMyPosts
   }) => (
    <div>
      {!areMyPostsLoaded &&
      <Spinner/>
      }
      <Grid>
        <Row>
          <Col md={8}>
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
            {areMoreMyPostsLoaded && !areMoreMyPosts &&
              "That's all! Like more posts and come back!"
            }
          </Col>
        </Row>
      </Grid>
    </div>
  )

MyPostsPage.propTypes = {
  areMyPostsLoaded: PropTypes.bool.isRequired
}

export default MyPostsPage