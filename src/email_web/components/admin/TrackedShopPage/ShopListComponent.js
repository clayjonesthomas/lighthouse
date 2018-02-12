import React from 'react'

import './ShopListComponent.css'
const ShopListComponent =
  ({
     name,
     website,
     posts
   }) => (
    <div>
      <a href={website}>
        {
          name
        }
      </a>
      {
        posts.map(post =>
          <PostListComponent
            title={post.title}
            key={post.key}
          />
        )
      }
    </div>
  )

export default ShopListComponent
