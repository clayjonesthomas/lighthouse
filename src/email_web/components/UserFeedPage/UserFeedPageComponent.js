import React, {PropTypes} from 'react'

import UserFeedPagePostBlock from './UserFeedPagePostBlock'

import "./UserFeedPageComponent.css"
const UserFeedPageComponent = ({
                                flattenedPosts
                              }) => (
  <div>
    <h1 id="user-feed-page-title">All Active Sales</h1>
    {
      flattenedPosts.map(post => 
        <UserFeedPagePostBlock
          key={post.key}
          shopName={post.shopName}
          shopWebsite={post.shopWebsite}
          title={post.title}
        />
      )
    }
  </div>
)

export default UserFeedPageComponent