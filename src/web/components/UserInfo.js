import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import LinkButton from './ui-kit/LinkButton'

const UserInfo =
  ({
     onShowLogin,
     username,
     isUserInfoLoaded,
     signOut
   }) => (
    <div style={{'borderStyle':'solid'}}>
      {!isUserInfoLoaded &&
        <Spinner/>
      }
      {isUserInfoLoaded && username &&
          "username: " + username
      }
      {isUserInfoLoaded && !username &&
          <button
          type="button"
          onClick={() => onShowLogin()}>
          Log in
          </button>
      }
      {isUserInfoLoaded && username &&
        <LinkButton
          onClick={() => signOut()}
        />
      }
    </div>
  )

UserInfo.propTypes = {
  username: PropTypes.string,
  onShowLogin: PropTypes.func.isRequired
}

export default UserInfo