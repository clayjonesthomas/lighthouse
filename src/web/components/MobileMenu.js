import React, {PropTypes} from 'react'
import Logo from './ui-kit/Logo'
import {Grid, Col, Row} from 'react-bootstrap'
import MinimalButton from "./ui-kit/MinimalButton"

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
          <Row>
            <Col xs={4}>
              <MinimalButton
                className="menu-button"
                onClick={onShowMobileLogin}
                words="LOG IN"
              />
            </Col>
            <Col xs={4}>
              <Logo
                onClick={() => onHome()}
              />
            </Col>
            <Col xs={4}>
              <MinimalButton
                className="menu-button sign-up-button"
                onClick={onShowMobileSignUp}
                words="SIGN UP"
              />
            </Col>
          </Row>
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