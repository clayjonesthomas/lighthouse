import React, {PropTypes} from 'react'
import Spinner from './ui-kit/Spinner'
import LinkButton from './ui-kit/LinkButton'
import FullLogo from './ui-kit/FullLogo'

import "./UserInfo.css"
import "./ShopBox.css"
const UserInfo =
  ({
     onShowLogin,
     onShowSignUp,
     username,
     isUserInfoLoaded,
     signOut,
     onHome
   }) => (
    <div id="top-bar-container">
      <div className="clear-fix user-info-container">
        <div className="user-info">
          {!isUserInfoLoaded &&
            <Spinner/>
          }
          {isUserInfoLoaded && username &&
            <div>
              <div className="user-greeting">
                {
                  "Hi " + username + "!"
                }
              </div>
              <LinkButton
                onClick={() => signOut()}
                contents="log out"
              />
            </div>
          }
          {isUserInfoLoaded && !username &&
            <div>
              <LinkButton
                onClick={() => onShowLogin()}
                contents="log in"
              />
              <span id="auth-break">|</span>
              <LinkButton
                onClick={() => onShowSignUp()}
                contents="sign up"
              />
            </div>
          }
        </div>
      </div>
      <div id="logo-container">
        <FullLogo
          onClick={onHome}
        />
        <span id="beta-version">
          BETA
        </span>
      </div>
    </div>
  )

UserInfo.propTypes = {
  username: PropTypes.string,
  onShowLogin: PropTypes.func.isRequired
}

export default UserInfo