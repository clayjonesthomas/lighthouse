import React from 'react'
import LogoCircle from '../../ui-kit/LogoCircle/LogoCircle'

import "./NavBar.css"
const NavBar = ({
                  isDisplayLogo,
                  onClickLogo,
                  onClickSignUp,
                  onClickLogIn,
                  onClickHowItWorks,
                  onClickSettings,
                  onClickLogout
                }) => (
  <div id="nav-bar">
    {isDisplayLogo &&
      <LogoCircle
        onClick={onClickLogo}
        scale={.5}
      />
    }
    <div id="nav-bar-link-container">
      {true ? //TODO change depending on if user is logged in
        <div id="general-nav-bar"> 
          <span className="nav-bar-link" onClick={onClickHowItWorks} tabIndex="0">How It Works</span>
          <span className="nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</span>
          <span className="nav-bar-link" onClick={onClickLogIn} tabIndex="0">Log In</span>
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
