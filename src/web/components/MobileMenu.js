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

     toggleMenu,
     isHamburgerMenuDisplayed,


     signOut,
     onShowMobileSignUp,
     onShowMobileLogin
   }) => (
    <div id="mobile-menu">
      {!username &&
        <button
          className="menu-button"
          type="button"
          onClick={onShowMobileLogin}>
          Log in
        </button>
      }
      {!username &&
        <button
          className="menu-button"
          type="button"
          onClick={onShowMobileSignUp}>
          Sign up
        </button>
      }
      {username &&
        <span>Hi {username}!</span>
      }
      {username &&
        <button
          className="menu-button"
          type="button"
          onClick={() =>
            toggleMenu()
          }>
          hamburger
        </button>
      }
      {isHamburgerMenuDisplayed &&
        <ul id="hamburger-dropdown">
          {
            <li
              onClick={() =>{
                toggleMenu()
                onHome()
              }}>
              Home
            </li>
          }
          {username &&
          <li
            onClick={() =>{
              toggleMenu()
              onMyShops()
            }}>
            Liked Shops
          </li>
          }
          {username &&
          <li
            onClick={() =>{
              toggleMenu()
              onMyPosts()
            }}>
            Liked Posts
          </li>
          }
          {username &&
          <li
            onClick={() =>{
              toggleMenu()
              onSelectNewPost()
            }}>
            Submit a Sale
          </li>
          }
          {username && isModerator &&
          <li
            onClick={() =>{
              toggleMenu()
              onAddAShop()
            }}>
            Add a Store
          </li>
          }
          {username &&
          <li
            onClick={() =>{
              toggleMenu()
              signOut()
            }}>
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