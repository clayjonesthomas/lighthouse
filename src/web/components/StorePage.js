import React, {PropTypes} from 'react'

const StorePage =
  ({
    name,
    website,
    likes,
    timestamp
  }) => (
    <div>
      {
        name + '   ' + website + '   ' + likes + '   ' + timestamp
      }
      <br/><br/>
    </div>
  )

StorePage.propTypes = {
  name: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired
}

export default StorePage
