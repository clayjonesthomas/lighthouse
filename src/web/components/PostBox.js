import React, {PropTypes} from 'react'
import {Link} from 'react-router'

const PostBox = ({post}) => (
  console.log(post),
  <div style={{'border-style':'strong'}}>
    {
      <Link to={"/store/" + post['store_url']}>
        {
          post['store']['name']
        }
      </Link>
    }
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

export default PostBox