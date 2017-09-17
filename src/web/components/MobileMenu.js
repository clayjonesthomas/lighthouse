import React, {PropTypes} from 'react'
import Logo from 'ui-kit/Logo'
import {Col, Row} from 'react-bootstrap'
import MinimalButton from "./ui-kit/MinimalButton"
import MenuButton from "./ui-kit/MenuButton/MenuButton"

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
        <Row>
          <Col xs={4}/>
          <Col xs={4}>
            <Logo
              onClick={() => onHome()}
            />
          </Col>
          <Col xs={4}>
            <MenuButton
              className="menu-button"
              onClick={toggleMenu}
              isMenuOpen={isHamburgerMenuDisplayed}
            />
          </Col>
        </Row>
      }
      {isHamburgerMenuDisplayed &&
        <div id="hamburger-dropdown">
          {
            <div
              className="menu-item"
              onClick={() =>{
                toggleMenu()
                onHome()
              }}>
              Home
            </div>
          }
          {username &&
          <div
            className="even-menu-item menu-item"
            onClick={() =>{
              toggleMenu()
              onMyShops()
            }}>
            My Shops
          </div>
          }
          {username &&
          <div
            className="menu-item"
            onClick={() =>{
              toggleMenu()
              onMyPosts()
            }}>
            My Posts
          </div>
          }
          {username &&
          <div
            className="even-menu-item menu-item"
            onClick={() =>{
              toggleMenu()
              onSelectNewPost()
            }}>
            Submit a Sale
          </div>
          }
          {username &&
          <div
            className="menu-item"
            onClick={() =>{
              toggleMenu()
              signOut()
            }}>
            Log Out
          </div>
          }
          {username && isModerator &&
          <div
            className="menu-item"
            onClick={() =>{
              toggleMenu()
              onAddAShop()
            }}>
            Add a Shop
          </div>
          }
        </div>
      }
    </div>
  )

MobileMenu.propTypes = {
}

export default MobileMenu