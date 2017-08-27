import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import "./Menu.css"
const Menu =
  ({onHome,
    onMyShops,
    onSelectNewPost,
    username,
    isModerator,
    onAddAShop,
    onMyPosts
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
      {username &&
        <Link
          to="/my_feed"
          className="menu-option">
          {
            "My Feed"
          }
        </Link>
      }
      {username &&
        <Link
          className="menu-option"
          to="/shops">
          Liked Shops
        </Link>
      }
      {username &&
        <Link
          className="menu-option"
          to="/posts">
          Liked Posts
        </Link>
      }
      {username &&
        <Link
          className="menu-option"
          to="/new">
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
  onHome: PropTypes.func.isRequired,
  onMyShops: PropTypes.func.isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
  username: PropTypes.string,
  isModerator: PropTypes.bool
}

export default Menu