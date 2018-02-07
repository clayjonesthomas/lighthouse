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
  <nav id="nav-bar" className="navbar navbar-toggleable navbar-inverse bg-faded">
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
      <div>
        <span className="nav-bar-span">{"Signed in as " + email}</span>
        <div className="collapse navbar-collapse" id="nav-bar-link-container">
          <ul className="navbar-nav ml-auto dropdown">
            <li className="nav-item nav-link nav-bar-link" onClick={onClickHowItWorks} tabIndex="0">How It Works</li>
            <li className="nav-item nav-link nav-bar-link" onClick={onClickSettings} tabIndex="0">Settings</li>
            <li className="nav-item nav-link nav-bar-link" onClick={onClickLogout} tabIndex="0">Log Out</li>
          </ul>
        </div>
      </div>
      :
      <div className="collapse navbar-collapse" id="nav-bar-link-container">
        <ul className="navbar-nav ml-auto dropdown">
          <li className="nav-item nav-link nav-bar-link" onClick={onClickHowItWorks} tabIndex="0">How It Works</li>
          <li className="nav-item nav-link nav-bar-link" onClick={onClickSignUp} tabIndex="0">Sign Up</li>
          <li className="nav-item nav-link nav-bar-link" onClick={onClickLogIn} tabIndex="0">Log In</li>
        </ul>
      </div>
    }
  </nav>   
)

export default NavBar

