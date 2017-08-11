import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import SubmitButton from './ui-kit/SubmitButton'
import LikeButton from './ui-kit/LikeButton/LikeButton'

import "./PostBox.css"
const PostBox = (
  {
    post,
    post_key,
    onLike,
    canDelete,
    onDelete
  }) => (
  <div
    className="post-box">
    <div
      className="post-box-inner">
      <div
        className="sale-title">
        {
          <a href={"http://" + post.store.website}>
            {
              post['title']
            }
          </a>
        }
      </div>
      <div className="sale-options">
        {
          <LikeButton
            onClick={() => onLike()}
            isPressed={post.isLiked}
            likes={post.likes}
            areLikesLeft={false}
          />
        }
        {
          <Link
            to={"/store/" + post['store_key']}
            className="shop-link">
            {
              post['store']['name']
            }
          </Link>
        }
        {canDelete &&
          <SubmitButton
            onClick={() => onDelete(post_key)}
            contents="delete"
          />
        }
      </div>
    </div>
    <hr className="post-line-break"/>
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostBox