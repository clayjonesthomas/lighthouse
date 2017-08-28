import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import SubmitButton from './ui-kit/SubmitButton'
import LikeButton from './ui-kit/LikeButton/LikeButton'
import {connect} from 'react-redux'
import {setMustBeSignedInNotification}
  from '../actions/NotificationActions'
import {archivePost} from '../actions/PostPageActions'

import "./PostBox.css"
const PostBox = (
  {
    post,
    post_key,
    onLike,
    isModerator,
    onDelete,
    isMobile,
    onArchive,
    username,
    fireMustSignIn
  }) => (
  <div
    className="post-box">
    <div
      className="post-box-inner">
      <div className="sale-shop">
        <Link
          to={"/store/" + post['store_key']}>
          {
            post['store']['name']
          }
        </Link>
      </div>
      <div className="sale-title">
        {
          <a
            href={post.store.website}>
            {
              post['title']
            }
          </a>
        }
      </div>
      <div className="sale-options">
        <LikeButton
          onClick={() => {
            if(username)
              onLike()
            else
              fireMustSignIn()
          }}
          isPressed={post.isLiked}
          likes={post.likes}
          areLikesLeft={false}
        />
        <div className="post-timestamp">
          {
            "Posted " + post.timestring
          }
        </div>
        {isModerator &&
          <div className="admin-tools">
            <SubmitButton
              className="admin-button"
              onClick={() => onDelete(post_key)}
              contents="delete"
            />
            <SubmitButton
              className="admin-button"
              onClick={() => onArchive(post_key)}
              contents="archive"
            />
          </div>
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

// throw this in a handler class
const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    isMobile: state.isMobile,
    username: state.username,
    isModerator: state.isModerator
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    fireMustSignIn: () =>
      dispatch(setMustBeSignedInNotification(undefined,
        "to like a post"
      )),
    onArchive: (postKey) => dispatch(archivePost(postKey))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostBox)