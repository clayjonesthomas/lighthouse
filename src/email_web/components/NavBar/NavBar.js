import React from 'react'

import "./NavBar.css"
const NavBar = ({
                  onClickSignUp,
                  onClickSettings,
                  onClickLogout
                }) => (
  <div id="nav-bar">
    <div id="nav-bar-link-container">
      {true ? //TODO change depending on if user is logged in
        <div id="general-nav-bar"> 
          <span className="nav-bar-link" tabIndex="0">How It Works</span>
          <span className="nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</span>
          <span className="nav-bar-link" tabIndex="0">Log In</span>
        </div>
        :
        <div id="user-nav-bar">
          <span className="nav-bar-link" onClick={onClickSettings} tabIndex="0">Settings</span>
          <span className="nav-bar-link" onClick={onClickLogout} tabIndex="0">Log Out</span>
        </div>
      }
      
    </div>
  </div>
)

export default NavBar