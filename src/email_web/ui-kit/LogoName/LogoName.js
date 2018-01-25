import React, {PropTypes} from 'react'

import './LogoName.css'
const LogoName = ({
                    onClick,
                    scale,
                    color
                  }) => (
  <div id="logo-name-wrapper">
    <span id="logo-graphic-wrapper">
      <svg
        viewBox="0 0 300 61"
        id="logo-svg"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Artboard-Copy-15"
            transform="translate(-225.000000, -770.000000)"
            fill={color || white}>
            <path
              d="M241.006587,772.429986 L241.006587,770 L243.032531,770 L243.032531,772.423556 C248.724014,772.891647 253.245781,777.419046 253.61934,783.062165 L256.947675,783.062165 L256.947675,785.048516 L254.376182,785.048516 L254.376182,792.843032 L256.947675,792.843032 L256.947675,800.895624 C256.947675,801.447909 256.49996,801.895624 255.947675,801.895624 L228.025944,801.895624 C227.473659,801.895624 227.025944,801.447909 227.025944,800.895624 L227.025944,792.843032 L230.064859,792.843032 L230.064859,785.048516 L227.025944,785.048516 L227.025944,783.062165 L230.495012,783.062165 C230.866923,777.443933 235.350534,772.931602 241.006587,772.429986 Z M241.207548,785.248171 L232.090802,785.248171 L232.090802,792.843032 L241.207548,792.843032 L241.207548,785.248171 Z M243.233492,785.248171 L243.233492,792.843032 L252.350238,792.843032 L252.350238,785.248171 L243.233492,785.248171 Z M253.94463,807.111459 L255.921348,814.789128 L225,825.117175 L227.348683,815.994777 L253.94463,807.111459 Z M242.098676,804.761136 L228.845105,809.187964 L229.984852,804.761136 L242.098676,804.761136 Z M234.681089,830.221506 L257.898067,822.466798 L259,826.746758 C253.996744,829.457264 248.243541,831 242.122832,831 C239.569011,831 237.07917,830.731423 234.681089,830.221506 Z"
              id="Combined-Shape-Copy-3"/>
          </g>
        </g>
        <text
          textAnchor="start"
          x="43"
          y="51"
          fill={color}
          fontSize={50}>
          lightho.us
        </text>
      </svg>
    </span>
  </div>
)

LogoName.propTypes = {
  onClick: PropTypes.func,
  scale: PropTypes.number.isRequired
}

export default LogoName