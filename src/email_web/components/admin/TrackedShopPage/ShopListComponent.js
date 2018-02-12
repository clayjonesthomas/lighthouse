import React from 'react'

import PostListComponent from './PostListComponent'

import './ShopListComponent.css'
const ShopListComponent =
  ({
     shopName,
     shopLink,
     shopPosts
   }) => (
    <div>
      <a href={shopLink}>
        {
          shopName
        }
      </a>
      {
        shopPosts.map(post =>
          <PostListComponent
            title={post.title}
            key={post.key}
            postKey={post.key}
          />
        )
      }
    </div>
  )

export default ShopListComponent
