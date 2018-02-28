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

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFeedPagePostBlock)
