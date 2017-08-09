import React, {PropTypes} from 'react'

const Logo = (
  {
    onClick,
    isPressed
  }) => (
  <svg
    width="69px"
    height="68px"
    viewBox="0 0 69 68"
    version="1.1">
    <g id="Page-1"
       stroke="none"
       strokeWidth="1"
       fill="none"
       fillRule="evenodd">
      <g
        id="Artboard-Copy-15"
        transform="translate(-207.000000, -79.000000)"
        fill="#2C2E32">
        <path d="M240.801612,89.3821513 C235.217988,89.8840945 230.791793,94.3993668 230.424645,100.02126 L227,100.02126 L227,102.008906 L230,102.008906 L230,109.808503 L227,109.808503 L227,117.866996 C227,118.41928 227.447715,118.866996 228,118.866996 L255.538564,118.866996 C256.090849,118.866996 256.538564,118.41928 256.538564,117.866996 L256.538564,109.808503 L254,109.808503 L254,102.008906 L256.538564,102.008906 L256.538564,100.02126 L253.25285,100.02126 C252.884075,94.374463 248.420213,89.8441129 242.801612,89.3757173 L242.801612,86.9505814 L240.801612,86.9505814 L240.801612,89.3821513 Z M241,102.208691 L241,109.808503 L232,109.808503 L232,102.208691 L241,102.208691 Z M243,102.208691 L252,102.208691 L252,109.808503 L243,109.808503 L243,102.208691 Z M235.181342,147 C219.145154,144.050178 207,130.078095 207,113.286882 C207,94.3507601 222.446176,79 241.5,79 C260.553824,79 276,94.3507601 276,113.286882 C276,126.111954 268.914695,137.292388 258.422021,143.172967 L257.476785,139.451577 L235.181342,147 Z M253.573974,124.086229 L227.318607,132.975338 L225,142.103682 L255.52538,131.768903 L253.573974,124.086229 Z M241.879716,121.734375 L229.921017,121.734375 L228.795866,126.164089 L241.879716,121.734375 Z"
              id="Combined-Shape-Copy"/>
      </g>
    </g>
  </svg>
)

Logo.propTypes = {
  onClick: PropTypes.func

}

export default Logo