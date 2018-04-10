import React from 'react'

import ShopPicker from '../../../ui-kit/ShopPicker/ShopPicker'
import {TRACKED_SHOPS_URL, NEW_SHOP_URL, EDIT_SHOPS_URL} from '../../../urls'

import './AdminPageComponent.css'
const AdminPageComponent =
  ({
     postTitleValue,
     selectedShops,
     isImportantValue,
     onTitleChange,
     onPickedShopsChange,
     onChangeIsImportant,
     submitNewPost
   }) => (
    <form onSubmit={submitNewPost}>
      <div>
        <a href={TRACKED_SHOPS_URL}>Tracked Shops</a>
        <a href={NEW_SHOP_URL}>New Shop</a>
        <a href={EDIT_SHOPS_URL}>Edit Shops</a>
      </div>
      <p>Post Title</p>
      <textarea
        id="admin-post-title"
        type="text"
        onChange={onTitleChange}
        value={postTitleValue}
      />
      <ShopPicker
        onPickedShopsChange={onPickedShopsChange}
        selectedShops={selectedShops}
        className="admin-shop-picker"
      />
      <span>
        is post important?
      </span>
      <input
        id="admin-is-important-checkbox"
        type="checkbox"
        checked={isImportantValue}
        value={isImportantValue}
        onChange={onChangeIsImportant}
      />
      <input
        id="admin-submit-button"
        type="submit"
        value="submit post"
      />
    </form>
)

export default AdminPageComponent
