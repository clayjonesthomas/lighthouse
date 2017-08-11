import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import SubmitButton from './ui-kit/SubmitButton'
import LikeButton from './ui-kit/LikeButton/LikeButton'
import {connect} from 'react-redux'

import "./PostBox.css"
const PostBox = (
  {
    post,
    post_key,
    onLike,
    canDelete,
    onDelete,
    isMobile
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
    <hr className={isMobile ? "post-line-break" :
      "post-line-break-desktop"}/>
  </div>
)

PostBox.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isMobile: state.isMobile
  })
}


export default connect(
  mapStateToProps
)(PostBox)