import React from 'react'

import '../AdminPage/AdminPageComponent.css'
const NewShopComponent =
  ({
     shopTitleValue,
     onShopTitleChange,
     shopSiteValue,
     onShopSiteChange,
     submitNewShop
   }) => (
    <form onSubmit={submitNewShop}>
      <div>
        <a href="/admin/tracked_shops">Tracked Shops</a>
      </div>
      <p>Shop Name</p>
      <input
        id="admin-post-title"
        type="text"
        onChange={onShopTitleChange}
        value={shopTitleValue}
      />
      <p>Shop Alt names (just comma separated please, no spaces)
      </p>
      <textarea
        id="admin-post-title"
        type="text"
        onChange={onShopTitleChange}
        value={shopTitleValue}
      />
      <p>Shop full website</p>
      <input
        id="admin-post-title"
        type="text"
        onChange={onShopTitleChange}
        value={shopTitleValue}
      />
      <input
        id="admin-submit-button"
        type="submit"
        value="submit shop"
      />
    </form>
)

export default NewShopComponent
