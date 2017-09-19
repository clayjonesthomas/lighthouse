import {TOGGLE_HAMBURGER_MENU}
  from 'features/mobile/MobileMenu/MobileMenuActions'

export function displayHamburgerMenu(state = false, action) {
  switch(action.type) {
    case TOGGLE_HAMBURGER_MENU:
      return !state.displayHamburgerMenu
    default:
      return state
  }
}