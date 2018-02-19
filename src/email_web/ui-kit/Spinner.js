import React from 'react'

const Spinner = (
  {
    colorHex
  }) => (
    <svg width="40px"
         height="40px"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid"
         className="lds-dual-ring">
      <circle
        cx="50"
        cy="50"
        fill="none"
        strokeLinecap="round"
        r="40"
        strokeWidth="10"
        stroke={colorHex}
        strokeDasharray="62.83185307179586 62.83185307179586"
        transform="rotate(283.337 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1" dur="1.5s"
          begin="0s"
          repeatCount="indefinite"/>
      </circle>
    </svg>
)

export default Spinner