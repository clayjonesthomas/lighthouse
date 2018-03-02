import React, {PropTypes} from 'react'

import UserFeedPagePostBlock from './UserFeedPagePostBlock'

import "./UserFeedPageComponent.css"
const UserFeedPageComponent = ({
                                activePosts
                              }) => (
  <div>
    <h1 id="user-feed-page-title">All Active Sales</h1>
    {
      activePosts.map(post => 
        <UserFeedPagePostBlock
          key={post.key}
          shopName={post.shop.name}
          shopWebsite={post.shop.website}
          title={post.title}
        />
      )
    }
  </div>
)

export default UserFeedPageComponent