//from FlatIcon, purchased with subscription
import React from 'react'
import {connect} from 'react-redux'

import "./FullLikeButton.css"
const FullLikeButton = (
  {
    width,
    height
  }
) => (
  <svg
    className="full-like-svg"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    width={width || "70px"}
    height={height || "70px"}>
  <g>
    <g>
      <path d="M474.629,73.737C449.625,46.823,414.953,32,377,32c-42.296,0-79.242,20.124-106.844,58.195
        c-5.629,7.764-10.316,15.52-14.156,22.69c-3.839-7.17-8.527-14.926-14.156-22.69C214.242,52.125,177.296,32,135,32
        c-37.953,0-72.625,14.822-97.629,41.736C13.272,99.675,0,134.576,0,172.01c0,72.713,52.613,119.341,119.224,178.375
        c38.514,34.133,82.166,72.82,125.281,124.251c2.85,3.399,7.059,5.363,11.495,5.363s8.645-1.964,11.495-5.363
        c43.115-51.431,86.768-90.118,125.281-124.251C459.387,291.352,512,244.724,512,172.01C512,134.576,498.728,99.675,474.629,73.737
        z"/>
    </g>
  </g>
  </svg>
)


function mapStateToProps(state, ownProps) {
  let defaultWidth;
  let defaultHeight;
  if(state.isMobile){
    defaultWidth=defaultHeight="70px";
  } else {
    defaultWidth=defaultHeight="20px";
  }
  return {
    isMobile: state.isMobile,
    width: ownProps.width || defaultWidth,
    height: ownProps.height || defaultHeight
  }
}


export default connect(
  mapStateToProps
)(FullLikeButton)