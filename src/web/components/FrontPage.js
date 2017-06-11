import PostBox from './PostBox'
import React, {PropTypes} from 'react'

const FrontPage =
  ({posts,
    onSelectPost,
    onSelectNewPost,
    onShowLogin}) => (
  <div>
    {
      <button
      type="button"
      onClick={() => onShowLogin()}>
      Log in
    </button>}
    {posts.map(post =>
        <PostBox
          post={post}/>
    )}
    {<button
      type="button"
      onClick={() => onSelectNewPost()}>
      Make a new Post
    </button>}
  </div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  onSelectPost: PropTypes.func.isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
}

export default FrontPage