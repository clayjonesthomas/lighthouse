import React from 'react'
import {connect} from 'react-redux'

import {archivePost} from './TrackedShopActions'

import './PostListComponent.css'
const PostListComponent =
  ({
     title,
     key,
     archivePost
   }) => (
    <div>
      {
        name
      }
      <a onClick={() => archivePost(key)} tabIndex="0"/>
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
