import React from 'react'

import ShopPicker from '../../../ui-kit/ShopPicker/ShopPicker'

import './AdminPageComponent.css'
const AdminPageComponent =
  ({
     goToTrackedShops,
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
        <a onClick={goToTrackedShops} tabIndex="-1">Tracked Shops</a>
      </div>
      <p>Post Title</p>
      <input
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
