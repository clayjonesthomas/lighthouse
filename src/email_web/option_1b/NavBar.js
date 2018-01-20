import React from 'react'
import LogoCircle from '../../web/ui-kit/LogoCircle'

import "./NavBar.css"
const NavBar = ({}) => (
  <div id="top-bar">
    <span id="logo">
      <div id="logo-icon-wrapper">
        <LogoCircle
          scale={.5}
          color="#ececec" //#0055ff
        />
      </div>
    </span>
    <div id="nav-bar-links">
      <span className="nav-bar-item">How It Works</span>
      <span className="nav-bar-item">Sign Up</span>
      <span className="nav-bar-item">Log In</span>
    </div>
  </div>
)

export default NavBar