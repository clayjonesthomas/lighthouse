import React from 'react'

import "./NavBar.css"
const NavBar = ({
  onClickLogo
                }) => (
  <div id="top-bar">
    <div id="nav-bar-links">
      <span className="nav-bar-item" onClick={onClickLogo}>How It Works</span>
      <span className="nav-bar-item">Sign Up</span>
      <span className="nav-bar-item">Log In</span>
    </div>
  </div>
)

export default NavBar