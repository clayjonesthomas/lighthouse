import React, {PropTypes} from 'react'

const StorePage =
  ({
    title,
    website,
    likes,
    timestamp
  }) => (
    <div>
      {
        title + '   ' + website + '   ' + likes + '   ' + timestamp
      }
      <br/><br/>
    </div>
  )

StorePage.propTypes = {
  title: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
}

export default StorePage
