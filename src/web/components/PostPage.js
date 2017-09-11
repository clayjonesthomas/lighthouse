import React, {PropTypes} from 'react'

const PostPage =
  ({
    title,
    author,
    likes,
    timestamp,
    shop_name,
    shop_website,
    shop_url_key
  }) => (
    <div>
      {
        title + '   ' +
        author + '   ' +
        likes + '   ' +
        timestamp + '   ' +
        shop_name + '   ' +
        shop_website + '   ' +
        shop_url_key
      }
      <br/><br/>
    </div>
  )

PostPage.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  shop_name: PropTypes.string.isRequired,
  shop_website: PropTypes.number.isRequired,
  shop_url_key: PropTypes.string.isRequired,
}

export default PostPage
