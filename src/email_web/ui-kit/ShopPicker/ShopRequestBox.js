import React from 'react'

import "./ShopRequestBox.css"
const ShopRequestBox = ({
  onClickRequestShop
}) => (
  <div className="request-box">
    <div>
      Your favorite store not here yet?
    </div>
    <div
      className="request-link-div"
      onClick={onClickRequestShop}
    >
      Request ittt!
    </div>

  </div>
)

export default ShopRequestBox