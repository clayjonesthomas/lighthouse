import PostBox from './PostBox'
import React, {PropTypes} from 'react'

const FrontPage =
  ({posts,
    onSelectNewPost,
    onShowLogin,
    username,
    onLike
  }) => (
  <div>
    {username &&
      "username: " + username
    }
    {!username &&
      <button
        type="button"
        onClick={() => onShowLogin()}>
        Log in
      </button>
    }
    {posts &&
      posts.map(post => {
        return <PostBox
          post={post}
          key={post.key}
          onLike={() => onLike(post.key)}
        />
      })
    }
    {username &&
      <button
        type="button"
        onClick={() => onSelectNewPost()}>
        Make a new Post
      </button>
    }
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })).isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
}

export default FrontPage