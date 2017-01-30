import PostBox from './PostBox'
import React, {PropTypes} from 'react'
import {LOGIN_MODAL, SIGN_UP_MODAL} from '../constants/constants'

const FrontPage =
  ({posts,
    onSelectPost,
    onSelectNewPost,
    onShowLogin,
    showModalType})
  => (
  <div>
    {posts.map(post =>
        <PostBox
          post={post}/>
    )}
    {<button
      type="button"
      onClick={() => onSelectNewPost()}>
      Make a new Post
    </button>}
    {<button
      type="button"
      onClick={() => onShowLogin()}>
      Log in
    </button>}
    {showModalType == LOGIN_MODAL &&
      <LoginModal/>
    }}
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