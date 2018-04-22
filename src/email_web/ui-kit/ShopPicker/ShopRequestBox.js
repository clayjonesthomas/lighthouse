import React from 'react'

import "./ShopRequestBox.css"
const ShopRequestBox = ({
  sentShopRequest,
  onClickRequestShop
}) => (
  <div className="request-box">
    {!sentShopRequest ?
      <div>
        <div>
          Your favorite store not here yet?
        </div>
        <div
          className="request-link-div"
          onClick={onClickRequestShop}
        >
          Request it!
        </div>
      </div>
      :
      <div>
        Request sent!
      </div>
    }

  </div>
)

export default ShopRequestBox