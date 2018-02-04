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
                  onClickLogout,
                  email
                }) => (
  <div id="nav-bar">
    {isDisplayLogo &&
      <LogoCircle
        onClick={onClickLogo}
        scale={.5}
      />
    }
    <div id="nav-bar-link-container">
      {email ?
        <div id="user-nav-bar">
          <span className="nav-bar-span">{"Signed in as " + email}</span>
          <a className="nav-bar-link" onClick={onClickSettings} tabIndex="0">Settings</a>
          <a className="nav-bar-link" onClick={onClickLogout} tabIndex="0">Log Out</a>
        </div>
        :
        <div id="general-nav-bar">
          <a className="nav-bar-link" onClick={onClickHowItWorks} tabIndex="0">How It Works</a>
          <a className="nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</a>
          <a className="nav-bar-link" onClick={onClickLogIn} tabIndex="0">Log In</a>
        </div>
      }
    </div>
  </div>
)

export default NavBar
