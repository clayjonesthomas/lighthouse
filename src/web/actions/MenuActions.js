export const GO_HOME = 'GO_HOME'
export const GO_MY_SHOPS = 'GO_MY_SHOPS'
export const GO_PROFILE = 'GO_PROFILE'

export const goHome = () => {
  return {
    type: GO_HOME
  }
}

export const goMyShops = () => {
  return {
    type: GO_MY_SHOPS,
  }
}

export const goProfile = () => {
  return {
    type: GO_PROFILE,
  }
}