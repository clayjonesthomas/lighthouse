import React from 'react'

import "./ShopRecommenderBox.css"
const ShopRecommenderBox = ({}) => (
  <div className="request-box">
    <div>
      Your favorite store not here yet?
    </div>
    <div
      className="request-link-div"
      onClick={() => window.open("mailto:info@lightho.us")}
    >
      Request it!
    </div>

  </div>
)

export default ShopRecommenderBox