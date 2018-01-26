import React from 'react'

import "./NavBar.css"
const NavBar = ({
                  onClickSignUp,
                  onClickLogIn
                }) => (
  <div id="nav-bar">
    <div id="nav-bar-link-container">
      <span className="nav-bar-link" tabIndex="0">How It Works</span>
      <span className="nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</span>
      <span className="nav-bar-link" onClick={onClickLogIn} tabIndex="0">Log In</span>
    </div>
  </div>
)

export default NavBar
