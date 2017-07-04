import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import LikeButton from './ui-kit/LikeButton'

const PostBox = (
  {
    post
  }) => (
  <div style={{'border-style':'strong'}}>
    {
      <Link to={"/store/" + post['store_url']}>
        {
          post['store']['name']
        }
      </Link>}
    {
      <Link to={"/post/"+post['post_url']}>
        {
          post['title']
        }
      </Link>
    }
    {
      <LikeButton
      isPressed={false}
      >

      </LikeButton>
    }
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostBox