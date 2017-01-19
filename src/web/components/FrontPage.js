import React, {PropTypes} from 'react'

const FrontPage = ({posts, onSelectPost, onSelectNewPost}) => (
  <div>{
    posts.map(post =>
      <div>post.title</div>
    )
  }</div>
)

FrontPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  onSelectPost: PropTypes.func.isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
}

export default FrontPage