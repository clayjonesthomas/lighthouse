import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {switchToPage} from './components/FrontPage/frontPageReducer'
import {allShops, signup} from './components/SignUpPage/signUpReducer'
import {login} from './components/LogInPage/logInReducer'
import {user, userEmail, userTrackedShopPosts,
  isLoadingPosts} from './services/userReducer'
import {newPass} from './components/NewPassword/newPasswordReducer'
import {forgotPassword} from './components/ForgotPassword/forgotPasswordReducer'
import {settings} from './components/SettingsPage/settingsReducer'
import {admin} from './components/admin/AdminPage/adminReducer'
import {trackedShops} from './components/admin/TrackedShopPage/trackedShopReducer'
import {newShop, editShop} from './components/admin/AdminSingleShopPage/adminSingleShopReducer'
import {writeSingleShopOnlyShopPickerRef, shopPickerInputText, hasSentShopRequest} 
  from './ui-kit/ShopPicker/shopPickerReducer'

export default combineReducers({
  allShops,
  switchToPage,
  signup,
  login,
  user,
  userEmail,
  userTrackedShopPosts,
  newPass,
  forgotPassword,
  settings,
  admin,
  trackedShops,
  isLoadingPosts,
  newShop,
  editShop,
  writeSingleShopOnlyShopPickerRef,
  shopPickerInputText,
  hasSentShopRequest,
  routing: routerReducer
})
