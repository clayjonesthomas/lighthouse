import React, {PropTypes} from 'react'

const PostPage =
  ({
    title,
    author,
    likes,
    timestamp,
    store_name,
    store_website,
    store_url_key
  }) => (
    <div>
      {
        title + '   ' +
        author + '   ' +
        likes + '   ' +
        timestamp + '   ' +
        store_name + '   ' +
        store_website + '   ' +
        store_url_key
      }
      <br/><br/>
    </div>
  )

PostPage.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  store_name: PropTypes.string.isRequired,
  store_website: PropTypes.number.isRequired,
  store_url_key: PropTypes.string.isRequired,
  //comments

}

export default PostPage
