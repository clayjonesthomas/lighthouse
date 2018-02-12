import React from 'react'
import {connect} from 'react-redux'

import {archivePost} from './TrackedShopActions'

const PostListComponent =
  ({
     title,
     postKey,
     archivePost,
     isImportant
   }) => (
    <div>
      {
        <span className={isImportant && "red-post"}>
          {
            title
          }
        </span>
      }
      <a
        onClick={() => archivePost(postKey)}
        tabIndex="0">
        Archive
      </a>
    </div>
  )

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    archivePost: (key) => dispatch(archivePost(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListComponent)
