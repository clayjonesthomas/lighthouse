import React from 'react'

import "../NavBar/NavBar.css"
const UserNavBar = ({
                      onClickSettings,
                      onClickLogout
                    }) => (
  <div id="nav-bar">
    <div id="nav-bar-link-container">
      <span className="nav-bar-link" onClick={onClickSettings} tabIndex="0">Settings</span>
      <span className="nav-bar-link" onClick={onClickLogout} tabIndex="0">Log Out</span>
    </div>
  </div>
)

export default UserNavBar