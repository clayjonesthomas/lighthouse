import React, {PropTypes} from 'react'

const UserInfo =
  ({
     onShowLogin,
     username
   }) => (
    <div style={{'borderStyle':'solid'}}>
      {username &&
      "username: " + username
      }
      {!username &&
      <button
        type="button"
        onClick={() => onShowLogin()}>
        Log in
      </button>
      }
    </div>
  )

UserInfo.propTypes = {
  username: PropTypes.string,
  onShowLogin: PropTypes.func.isRequired
}

export default UserInfo