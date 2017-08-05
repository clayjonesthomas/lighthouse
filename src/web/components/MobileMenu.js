import React, {PropTypes} from 'react'

import './MobileMenu.css'
const MobileMenu =
  ({
     onHome,
     onMyShops,
     onSelectNewPost,
     username,
     isModerator,
     onAddAShop,
     onMyPosts,

     showMenu,
     hideMenu,
     isHamburgerMenuDisplayed,


     signOut,
     onShowMobileLogin
   }) => (
    <div id="mobile-menu">
      {!username &&
        <button
          className="menu-button"
          type="button"
          onClick={onShowMobileLogin}>
          Sign in
        </button>
      }
      {username &&
      <button
        className="menu-button"
        type="button"
        onClick={showMenu}>
        hamburger
      </button>
      }
      {isHamburgerMenuDisplayed &&
        <ul id="hamburger-dropdown">
          {
            <li
              onClick={() => onHome()}>
              Home
            </li>
          }
          {username &&
          <li
            onClick={() => onMyShops()}>
            Liked Shops
          </li>
          }
          {username &&
          <li
            onClick={() => onMyPosts()}>
            Liked Posts
          </li>
          }
          {username &&
          <li
            onClick={() => onSelectNewPost()}>
            Submit a Sale
          </li>
          }
          {username && isModerator &&
          <li
            onClick={() => onAddAShop()}>
            Add a Store
          </li>
          }
          {username &&
          <li
            onClick={signOut}>
            Log Out
          </li>
          }
        </ul>
      }
    </div>
  )

MobileMenu.propTypes = {
}

export default MobileMenu