import React, {PropTypes} from 'react'

const Menu =
  ({onHome,
    onMyShops,
    onProfile}) => (
    <div style={{'border-style': 'solid'}}>
      {<button
          type="button"
          onClick={() => onHome()}>
          Home
      </button>}
      {<button
        type="button"
        onClick={() => onMyShops()}>
        My Shops
      </button>}
      {<button
        type="button"
        onClick={() => onProfile()}>
        My Profile
      </button>}
    </div>
  )

Menu.propTypes = {
  onHome: PropTypes.func.isRequired,
  onMyShops: PropTypes.func.isRequired,
  onProfile: PropTypes.func.isRequired,
}

export default Menu