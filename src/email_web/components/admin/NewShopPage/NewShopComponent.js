import React from 'react'

import '../AdminPage/AdminPageComponent.css'
const NewShopComponent =
  ({
    uploadUrl,
    shopKey,
    onShopNameChange,
    shopNameValue,
    onShopAltNamesChange,
    shopAltNamesValue,
    onShopSiteChange,
    shopSiteValue,
    shopSite,
    shopIconImageUrl
   }) => (
    <form action={uploadUrl}
      encType="multipart/form-data"
      method="post"
    >
      <div>
        <a href="/admin/tracked_shops">Tracked Shops</a>
      </div>
      <input type="hidden" value={shopKey || ''} name="shop-key" />
      <p className="edit-shop-header">Shop Name</p>
      <input
        name="shop-name"
        className="admin-shop-input"
        type="text"
        onChange={onShopNameChange}
        value={shopNameValue}
      />
      <p className="edit-shop-header">
        Shop Alt names (just comma separated please, no spaces)
      </p>
      <textarea
        name="shop-alt-names"
        className="admin-shop-input"
        type="text"
        onChange={onShopAltNamesChange}
        value={shopAltNamesValue}
      />
      <p className="edit-shop-header">Shop full website</p>
      <input
        name="shop-site"
        className="admin-shop-input"
        type="text"
        onChange={onShopSiteChange}
        value={shopSiteValue}
      />
      <p className="edit-shop-header">Add a shop image</p>
      {shopIconImageUrl && 
        <div>
          <p>Current image:</p>
          <img src={shopIconImageUrl} /> 
        </div>
      }
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
