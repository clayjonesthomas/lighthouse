import React from 'react'

import "./MoreContentButton.css"
const MoreContentButton = (
  {
    onClick,
    words
  }
) => (
    <button
      className="more-content-button"
      type="button"
      onClick={onClick}
    >
      {words}
    </button>
)

export default MoreContentButton