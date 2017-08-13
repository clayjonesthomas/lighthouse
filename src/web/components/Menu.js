import React, {PropTypes} from 'react'

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
        <div
          className="menu-option menu-option-first"
          onClick={() => onHome()}>
          Home
        </div>
      }
      {username &&
        <div
          className="menu-option"
          onClick={() => onMyShops()}>
          Liked Shops
        </div>
      }
      {username &&
        <div
          className="menu-option"
          onClick={() => onMyPosts()}>
          Liked Posts
        </div>
      }
      {username &&
        <div
          className="menu-option"
          onClick={() => onSelectNewPost()}>
          Submit a Sale
        </div>
      }
      {username && isModerator &&
        <div
          className="menu-option"
          onClick={() => onAddAShop()}>
          Add a Store
        </div>
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