import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import "./Menu.css"
const Menu =
  ({
    username,
    isModerator,
    setMustBeSignedInNotification
  }) => (
    <div className="menu-container-desktop">
      {
        <Link
          to="/"
          className="menu-option menu-option-first">
          {
            "All Posts"
          }
        </Link>
      }
      {
        <Link
          to="/my_feed"
          className="menu-option"
          onClick={(e) => {
            setMustBeSignedInNotification(e)
          }}>
          {
            "My Feed"
          }
        </Link>
      }
      {
        <Link
          className="menu-option"
          to="/shops"
          onClick={(e) =>
            setMustBeSignedInNotification(e)}
        >
          Liked Shops
        </Link>
      }
      {
        <Link
          className="menu-option"
          to="/posts"
          onClick={(e) =>
            setMustBeSignedInNotification(e)}
        >
          Liked Posts
        </Link>
      }
      {
        <Link
          className="menu-option"
          to="/new"
          onClick={(e) =>
            setMustBeSignedInNotification(e)}
        >
          Submit a Post
        </Link>
      }
      {username && isModerator &&
        <Link
          className="menu-option"
          to="/new_shop">
          Add a Shop
        </Link>
      }
    </div>
  )

Menu.propTypes = {
  username: PropTypes.string,
  isModerator: PropTypes.bool,
  setMustBeSignedInNotification: PropTypes.func.isRequired
}

export default Menu