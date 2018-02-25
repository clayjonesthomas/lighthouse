import React, {PropTypes} from 'react'

import UserFeedPagePostBlock from './UserFeedPagePostBlock'

import "./UserFeedPageComponent.css"
const UserFeedPageComponent = ({
                                flattenedPosts
                              }) => (
  <div>
    <h1>User Feed Page</h1>
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