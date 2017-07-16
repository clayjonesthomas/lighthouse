import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'

const UserInfo =
  ({
     onShowLogin,
     username,
     isUserInfoLoaded
   }) => (
    <div style={{'borderStyle':'solid'}}>
      {!isUserInfoLoaded &&
        <Spinner/>
      }
      {isUserInfoLoaded &&
        username &&
          "username: " + username
      }
      {isUserInfoLoaded &&
        !username &&
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