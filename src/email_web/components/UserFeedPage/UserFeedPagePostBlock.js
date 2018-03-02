import React from 'react'
import {connect} from 'react-redux'

const UserFeedPagePostBlock =
  ({
     title,
     shopName,
     shopWebsite
   }) => (
    <div className="user-feed-post-block">
      <a
        href={shopWebsite}
        tabIndex="0">
        {shopName}
      </a>
      {title}
    </div>
  )

export default connect()(UserFeedPagePostBlock)
