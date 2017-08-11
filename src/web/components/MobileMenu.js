import React, {PropTypes} from 'react'
import Logo from './ui-kit/Logo'
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
        <table id="hamburger-dropdown">
          {
            <tr
              onClick={() =>{
                toggleMenu()
                onHome()
              }}>
              <div className="menu-item">
                Home
              </div>
            </tr>
          }
          {username &&
          <tr
            className="even-menu-item"
            onClick={() =>{
              toggleMenu()
              onMyShops()
            }}>
            <div className="menu-item">
              Liked Shops
            </div>
          </tr>
          }
          {username &&
          <tr
            onClick={() =>{
              toggleMenu()
              onMyPosts()
            }}>
            <div className="menu-item">
              Liked Posts
            </div>
          </tr>
          }
          {username &&
          <tr
            className="even-menu-item"
            onClick={() =>{
              toggleMenu()
              onSelectNewPost()
            }}>
            <div className="menu-item">
              Submit a Sale
            </div>
          </tr>
          }
          {username &&
          <tr
            onClick={() =>{
              toggleMenu()
              signOut()
            }}>
            <div className="menu-item">
              Log Out
            </div>
          </tr>
          }
          {username && isModerator &&
          <tr
            onClick={() =>{
              toggleMenu()
              onAddAShop()
            }}>
            <div className="menu-item">
              Add a Store
            </div>
          </tr>
          }
        </table>
      }
    </div>
  )

MobileMenu.propTypes = {
}

export default MobileMenu