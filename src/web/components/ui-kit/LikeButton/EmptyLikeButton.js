//from FlatIcon, purchased with subscription
import React from 'react'
import {connect} from 'react-redux'

import "./EmptyLikeButton.css"
const EmptyLikeButton = (
  {
    width,
    height,
    defaultWidth,
    defaultHeight
  }
) => (
  <svg
    className="empty-like-svg"
    version="1.1"
    x="0px"
    y="0px"
    width={width || "70px"}
    height={height || "70px"}
    viewBox="0 0 512 512">
    <g>
      <g>
        <path d="M474.629,73.736C449.625,46.823,414.953,32,377,32c-42.296,0-79.242,20.124-106.844,58.195
          c-5.629,7.764-10.316,15.52-14.156,22.69c-3.839-7.17-8.527-14.926-14.156-22.69C214.242,52.125,177.296,32,135,32
          c-37.953,0-72.625,14.822-97.629,41.736C13.272,99.675,0,134.576,0,172.01c0,72.713,52.613,119.341,119.224,178.375
          c38.514,34.133,82.166,72.82,125.281,124.251c2.85,3.399,7.059,5.363,11.495,5.363s8.645-1.964,11.495-5.363
          c43.115-51.431,86.768-90.118,125.281-124.251C459.387,291.352,512,244.724,512,172.01C512,134.576,498.728,99.675,474.629,73.736
          z M372.878,327.934C336.966,359.761,296.674,395.472,256,441.945c-40.674-46.473-80.966-82.184-116.878-114.011
          C75.771,271.79,30,231.225,30,172.01C30,109.294,75.14,62,135,62c32.488,0,60.097,15.182,82.059,45.123
          c17.298,23.583,24.459,47.795,24.53,48.037C243.441,161.579,249.317,166,256,166c6.693,0,12.576-4.434,14.42-10.868
          C270.687,154.201,298.019,62,377,62c59.86,0,105,47.294,105,110.01C482,231.225,436.229,271.79,372.878,327.934z"/>
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
)(EmptyLikeButton)