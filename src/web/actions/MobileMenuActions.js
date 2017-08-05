export const SHOW_HAMBURGER_MENU = 'SHOW_HAMBURGER_MENU'
export const HIDE_HAMBURGER_MENU = 'HIDE_HAMBURGER_MENU'

export const showHamburgerMenu = () => {
  return {
    type: SHOW_HAMBURGER_MENU
  }
}

export const hideHamburgerMenu = () => {
  return {
    type: HIDE_HAMBURGER_MENU
  }
}
