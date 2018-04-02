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
     uploadUrl,
     submitNewShop
   }) => (
    <form action={uploadUrl}
      encType="multipart/form-data"
      method="post"
    >
      <div>
        <a href="/admin/tracked_shops">Tracked Shops</a>
      </div>
      <p>Shop Name</p>
      <input
        name="shop-name"
        className="admin-shop-input"
        type="text"
        onChange={onShopNameChange}
        value={shopNameValue}
      />
      <p>Shop Alt names (just comma separated please, no spaces)</p>
      <textarea
        name="shop-alt-names"
        className="admin-shop-input"
        type="text"
        onChange={onShopAltNamesChange}
        value={shopAltNamesValue}
      />
      <p>Shop full website</p>
      <input
        name="shop-site"
        className="admin-shop-input"
        type="text"
        onChange={onShopSiteChange}
        value={shopSiteValue}
      />
      <p>Add a shop image</p>
      <input 
        name="img" 
        className="admin-shop-input" 
        type="file" 
      />
      <input
        id="admin-submit-button"
        type="submit"
        value="submit shop"
      />
  </form>
)

export default NewShopComponent
