import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import LikeButton from './ui-kit/LikeButton'

const PostBox = (
  {
    post,
    onLike
  }) => (
  <div style={{'borderStyle':'solid'}}>
    {
      <Link to={"/store/" + post['store_url']}>
        {
          post['store']['name']
        }
      </Link>}
    {
      <a href={"http://" + post.store.website}>
        {
          post['title']
        }
      </a>
    }
    {
      <LikeButton
        onClick={() => onLike()}
        isPressed={post.isLiked}
      />
    }
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostBox