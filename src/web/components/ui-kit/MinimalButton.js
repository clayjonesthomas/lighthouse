import React from 'react'

import "./MinimalButton.css"
const MinimalButton = (
  {
    onClick,
    className,
    words
  }) => (
  <button
    className={"minimal-button " + className}
    type="button"
    onClick={() => onClick()}>
    {
      words
    }
  </button>
)

export default MinimalButton