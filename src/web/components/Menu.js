import React, {PropTypes} from 'react'

const Menu =
  ({onHome,
    onMyShops,
    onSelectNewPost,
    username
  }) => (
    <div style={{'borderStyle': 'solid'}}>
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
      {username &&
        <button
        type="button"
        onClick={() => onSelectNewPost()}>
        Submit a Sale
      </button>}
    </div>
  )

Menu.propTypes = {
  onHome: PropTypes.func.isRequired,
  onMyShops: PropTypes.func.isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
  username: PropTypes.string
}

export default Menu