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
  <nav id="nav-bar" className="navbar navbar-toggleable-md navbar-inverse bg-faded">
    <button 
      className="navbar-toggler navbar-toggler-right" 
      type="button" data-toggle="collapse" 
      data-target="#nav-bar-link-container" 
      aria-controls="nav-bar-link-container" 
      aria-expanded="false" 
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="mr-auto" href="#">
      {isDisplayLogo &&
        <LogoCircle
          onClick={onClickLogo}
          scale={.5}
        />
      }
    </a>
    {email ? 
      <div className="collapse navbar-collapse" id="nav-bar-link-container">
        <ul className="navbar-nav ml-auto dropdown">
          <li><span className="nav-item nav-bar-span">{"Signed in as " + email}</span></li>
          <li><a className="nav-item nav-link nav-bar-link" href="#" onClick={onClickSettings} tabIndex="0">Settings</a></li>
          <li><a className="nav-item nav-link nav-bar-link" href="#" onClick={onClickLogout} tabIndex="0">Log Out</a></li>
        </ul>
      </div>
      :
      <div className="collapse navbar-collapse" id="nav-bar-link-container">
        <ul className="navbar-nav ml-auto dropdown">
          <li><a className="nav-item nav-link nav-bar-link" href="#" onClick={onClickHowItWorks} tabIndex="0">How It Works</a></li>
          <li><a className="nav-item nav-link nav-bar-link" href="#" onClick={onClickSignUp} tabIndex="0">Sign Up</a></li>
          <li><a className="nav-item nav-link nav-bar-link" href="#" onClick={onClickLogIn} tabIndex="0">Log In</a></li>
        </ul>
      </div>
    }
  </nav>   
)

export default NavBar

