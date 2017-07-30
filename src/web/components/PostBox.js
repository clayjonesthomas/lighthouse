import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import LikeButton from './ui-kit/LikeButton'
import SubmitButton from './ui-kit/SubmitButton'

const PostBox = (
  {
    post,
    post_key,
    onLike,
    canDelete,
    onDelete
  }) => (
  <div style={{'borderStyle':'solid'}}>
    {
      <Link to={"/store/" + post['store_key']}>
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
    {canDelete &&
      <SubmitButton
        onClick={() => onDelete(post_key)}
        contents="delete"
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