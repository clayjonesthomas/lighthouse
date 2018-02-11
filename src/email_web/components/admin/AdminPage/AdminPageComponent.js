import React from 'react'

import ShopPicker from '../../../ui-kit/ShopPicker/ShopPicker'

const AdminPageComponent =
  ({
     goToTrackedShops,
     postTitleValue,
     selectedShops,
     onTitleChange,
     onPickedShopsChange,
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
      />
      <input
        id="admin-submit-button"
        type="submit"
        value="submit post"
      />
    </form>
  )

export default AdminPageComponent
