import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'

const FrontPage =
  ({posts,
    onSelectNewPost,
    username,
    onLike,
    arePostsLoaded
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
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired
}

export default FrontPage