import React, {PropTypes} from 'react'
import {Link} from 'react-router'

const FrontPage = ({posts, onSelectPost, onSelectNewPost}) => (
  <div>
    {posts.map(post =>
      <div>post.title</div>
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