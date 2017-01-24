import React, {PropTypes} from 'react'

const PostBox = ({post}) => (
  <div>
    {post.title}
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostBox