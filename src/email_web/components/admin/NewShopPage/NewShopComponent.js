import React from 'react'

import '../AdminPage/AdminPageComponent.css'
const NewShopComponent =
  ({
     shopNameValue,
     onShopNameChange,
     shopAltNamesValue,
     onShopAltNamesChange,
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
        onChange={onShopNameChange}
        value={shopNameValue}
      />
      <p>Shop Alt names (just comma separated please, no spaces)
      </p>
      <textarea
        id="admin-post-title"
        type="text"
        onChange={onShopAltNamesChange}
        value={shopAltNamesValue}
      />
      <p>Shop full website</p>
      <input
        id="admin-post-title"
        type="text"
        onChange={onShopSiteChange}
        value={shopSiteValue}
      />
      <input
        id="admin-submit-button"
        type="submit"
        value="submit shop"
      />
    </form>
)

export default NewShopComponent
