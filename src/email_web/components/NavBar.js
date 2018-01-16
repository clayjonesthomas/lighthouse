import React from 'react'

import "./NavBar.css"
const NavBar = ({
                  onClickSignUp
                }) => (
  <div id="nav-bar">
    <div id="nav-bar-link-container">
      <span className="nav-bar-link">How It Works</span>
      <span className="nav-bar-link" onClick={onClickSignUp}>Sign Up</span>
      <span className="nav-bar-link">Log In</span>
    </div>
  </div>
)

export default NavBar