import React, {PropTypes} from 'react'

const Menu =
  ({onHome,
    onMyShops,
    onSelectNewPost,
    username,
    isModerator,
    onAddAShop,
    onMyPosts
  }) => (
    <div style={{'borderStyle': 'solid'}}>
      {
        <button
          type="button"
          onClick={() => onHome()}>
          Home
      </button>
      }
      {username &&
        <button
        type="button"
        onClick={() => onMyShops()}>
        Liked Shops
      </button>
      }
      {username &&
      <button
        type="button"
        onClick={() => onMyPosts()}>
        Liked Posts
      </button>
      }
      {username &&
        <button
        type="button"
        onClick={() => onSelectNewPost()}>
        Submit a Sale
      </button>
      }
      {username && isModerator &&
      <button
        type="button"
        onClick={() => onAddAShop()}>
        Add a Store
      </button>
      }
    </div>
  )

Menu.propTypes = {
  onHome: PropTypes.func.isRequired,
  onMyShops: PropTypes.func.isRequired,
  onSelectNewPost: PropTypes.func.isRequired,
  username: PropTypes.string,
  isModerator: PropTypes.bool
}

export default Menu