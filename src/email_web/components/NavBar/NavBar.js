import React from 'react'

import "./NavBar.css"
const NavBar = ({
                  onClickSignUp,
                  onClickLogIn,
                  onClickSettings,
                  onClickLogout,
                  email
                }) => (
  <div id="nav-bar">
    <div id="nav-bar-link-container">
      {email ?
        <div id="user-nav-bar">
          <a className="nav-bar-link" onClick={onClickSettings} tabIndex="0">Settings</a>
          <a className="nav-bar-link" onClick={onClickLogout} tabIndex="0">Log Out</a>
        </div>
        :
        <div id="general-nav-bar">
          <a className="nav-bar-link" tabIndex="0">How It Works</a>
          <a className="nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</a>
          <a className="nav-bar-link" onClick={onClickLogIn} tabIndex="0">Log In</a>
        </div>
      }
    </div>
  </div>
)

export default NavBar
