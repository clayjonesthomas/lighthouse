//from FlatIcon, purchased with subscription
import React from 'react'
import HamburgerButton from './HamburgerButton'
import CloseMenuButton from './CloseMenuButton'

import "./MenuButton.css"
const MenuButton = (
  {
    isMenuOpen,
    onClick
  }
) => (
  <div
    className="menu-button-svg">
    {isMenuOpen ?
      <CloseMenuButton onClick={onClick}/>
      :
      <HamburgerButton onClick={onClick}/>
    }
  </div>


)

export default MenuButton