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
        version="1.1">
        <g
          id="g3402">
          <g
            fillRule="evenodd"
            fill="none"
            strokeWidth="1"
            stroke="none"
            id="Page-1">
            <g
              fill="#003091"
              transform="translate(-225.000000, -770.000000)"
              id="Artboard-Copy-15">
              <path
                id="Combined-Shape-Copy-3"
                d="M241.006587,772.429986 L241.006587,770 L243.032531,770 L243.032531,772.423556 C248.724014,772.891647 253.245781,777.419046 253.61934,783.062165 L256.947675,783.062165 L256.947675,785.048516 L254.376182,785.048516 L254.376182,792.843032 L256.947675,792.843032 L256.947675,800.895624 C256.947675,801.447909 256.49996,801.895624 255.947675,801.895624 L228.025944,801.895624 C227.473659,801.895624 227.025944,801.447909 227.025944,800.895624 L227.025944,792.843032 L230.064859,792.843032 L230.064859,785.048516 L227.025944,785.048516 L227.025944,783.062165 L230.495012,783.062165 C230.866923,777.443933 235.350534,772.931602 241.006587,772.429986 Z M241.207548,785.248171 L232.090802,785.248171 L232.090802,792.843032 L241.207548,792.843032 L241.207548,785.248171 Z M243.233492,785.248171 L243.233492,792.843032 L252.350238,792.843032 L252.350238,785.248171 L243.233492,785.248171 Z M253.94463,807.111459 L255.921348,814.789128 L225,825.117175 L227.348683,815.994777 L253.94463,807.111459 Z M242.098676,804.761136 L228.845105,809.187964 L229.984852,804.761136 L242.098676,804.761136 Z M234.681089,830.221506 L257.898067,822.466798 L259,826.746758 C253.996744,829.457264 248.243541,831 242.122832,831 C239.569011,831 237.07917,830.731423 234.681089,830.221506 Z" />
            </g>
          </g>
          <g
            style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
            id="text3390">
            <path
              d="m 47.95,13.9 3.55,0 0,37.1 -3.55,0 0,-37.1 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3409" />
            <path
              d="m 61.426563,24.7 3.549999,0 0,26.3 -3.549999,0 0,-26.3 z m 1.799999,-5.75 q -1.1,0 -1.85,-0.75 -0.75,-0.75 -0.75,-1.8 0,-1 0.75,-1.75 0.75,-0.75 1.85,-0.75 1.1,0 1.85,0.75 0.75,0.7 0.75,1.7 0,1.1 -0.75,1.85 -0.75,0.75 -1.85,0.75 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3411" />
            <path
              d="m 99.253125,24.7 0,23.1 q 0,6.7 -3.3,9.9 -3.25,3.25 -9.85,3.25 -3.65,0 -6.95,-1.1 -3.25,-1.05 -5.3,-2.95 l 1.8,-2.7 q 1.9,1.7 4.6,2.65 2.75,0.95 5.75,0.95 5,0 7.35,-2.35 2.35,-2.3 2.35,-7.2 l 0,-3.35 q -1.65,2.5 -4.35,3.8 -2.65,1.3 -5.9,1.3 -3.7,0 -6.75,-1.6 -3,-1.65 -4.75,-4.55 -1.7,-2.95 -1.7,-6.65 0,-3.7 1.7,-6.6 1.75,-2.9 4.75,-4.5 3,-1.6 6.75,-1.6 3.35,0 6.05,1.35 2.7,1.35 4.35,3.9 l 0,-5.05 3.4,0 z m -13.45,22.15 q 2.85,0 5.15,-1.2 2.3,-1.25 3.55,-3.45 1.3,-2.2 1.3,-5 0,-2.8 -1.3,-4.95 -1.25,-2.2 -3.55,-3.4 -2.25,-1.25 -5.15,-1.25 -2.85,0 -5.15,1.2 -2.25,1.2 -3.55,3.4 -1.25,2.2 -1.25,5 0,2.8 1.25,5 1.3,2.2 3.55,3.45 2.3,1.2 5.15,1.2 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3413" />
            <path
              d="m 122.58047,24.5 q 4.95,0 7.85,2.9 2.95,2.85 2.95,8.35 l 0,15.25 -3.55,0 0,-14.9 q 0,-4.1 -2.05,-6.25 -2.05,-2.15 -5.85,-2.15 -4.25,0 -6.75,2.55 -2.45,2.5 -2.45,6.95 l 0,13.8 -3.55,0 0,-37.1 3.55,0 0,15.4 q 1.45,-2.3 4,-3.55 2.55,-1.25 5.85,-1.25 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3415" />
            <path
              d="m 156.91719,49.4 q -1,0.9 -2.5,1.4 -1.45,0.45 -3.05,0.45 -3.7,0 -5.7,-2 -2,-2 -2,-5.65 l 0,-15.9 -4.7,0 0,-3 4.7,0 0,-5.75 3.55,0 0,5.75 8,0 0,3 -8,0 0,15.7 q 0,2.35 1.15,3.6 1.2,1.2 3.4,1.2 1.1,0 2.1,-0.35 1.05,-0.35 1.8,-1 l 1.25,2.55 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3417" />
            <path
              d="m 176.77969,24.5 q 4.95,0 7.85,2.9 2.95,2.85 2.95,8.35 l 0,15.25 -3.55,0 0,-14.9 q 0,-4.1 -2.05,-6.25 -2.05,-2.15 -5.85,-2.15 -4.25,0 -6.75,2.55 -2.45,2.5 -2.45,6.95 l 0,13.8 -3.55,0 0,-37.1 3.55,0 0,15.4 q 1.45,-2.3 4,-3.55 2.55,-1.25 5.85,-1.25 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3419" />
            <path
              d="m 208.11406,51.25 q -3.8,0 -6.85,-1.7 -3.05,-1.75 -4.8,-4.8 -1.75,-3.05 -1.75,-6.9 0,-3.85 1.75,-6.9 1.75,-3.05 4.8,-4.75 3.05,-1.7 6.85,-1.7 3.8,0 6.85,1.7 3.05,1.7 4.75,4.75 1.75,3.05 1.75,6.9 0,3.85 -1.75,6.9 -1.7,3.05 -4.75,4.8 -3.05,1.7 -6.85,1.7 z m 0,-3.15 q 2.8,0 5,-1.25 2.25,-1.3 3.5,-3.65 1.25,-2.35 1.25,-5.35 0,-3 -1.25,-5.35 -1.25,-2.35 -3.5,-3.6 -2.2,-1.3 -5,-1.3 -2.8,0 -5.05,1.3 -2.2,1.25 -3.5,3.6 -1.25,2.35 -1.25,5.35 0,3 1.25,5.35 1.3,2.35 3.5,3.65 2.25,1.25 5.05,1.25 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3421" />
            <path
              d="m 228.28047,51.25 q -1.1,0 -1.9,-0.8 -0.75,-0.8 -0.75,-1.95 0,-1.15 0.75,-1.9 0.8,-0.8 1.9,-0.8 1.1,0 1.9,0.8 0.8,0.75 0.8,1.9 0,1.15 -0.8,1.95 -0.8,0.8 -1.9,0.8 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3423" />
            <path
              d="m 261.49375,24.7 0,26.3 -3.4,0 0,-4.8 q -1.4,2.4 -3.85,3.75 -2.45,1.3 -5.6,1.3 -5.15,0 -8.15,-2.85 -2.95,-2.9 -2.95,-8.45 l 0,-15.25 3.55,0 0,14.9 q 0,4.15 2.05,6.3 2.05,2.15 5.85,2.15 4.15,0 6.55,-2.5 2.4,-2.55 2.4,-7.05 l 0,-13.8 3.55,0 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3425" />
            <path
              d="m 278.53516,51.25 q -3.2,0 -6.15,-0.9 -2.9,-0.95 -4.55,-2.35 l 1.6,-2.8 q 1.65,1.3 4.15,2.15 2.5,0.8 5.2,0.8 3.6,0 5.3,-1.1 1.75,-1.15 1.75,-3.2 0,-1.45 -0.95,-2.25 -0.95,-0.85 -2.4,-1.25 -1.45,-0.45 -3.85,-0.85 -3.2,-0.6 -5.15,-1.2 -1.95,-0.65 -3.35,-2.15 -1.35,-1.5 -1.35,-4.15 0,-3.3 2.75,-5.4 2.75,-2.1 7.65,-2.1 2.55,0 5.1,0.7 2.55,0.65 4.2,1.75 l -1.55,2.85 q -3.25,-2.25 -7.75,-2.25 -3.4,0 -5.15,1.2 -1.7,1.2 -1.7,3.15 0,1.5 0.95,2.4 1,0.9 2.45,1.35 1.45,0.4 4,0.85 3.15,0.6 5.05,1.2 1.9,0.6 3.25,2.05 1.35,1.45 1.35,4 0,3.45 -2.9,5.5 -2.85,2 -7.95,2 z"
              style={{fontStyle: "normal",fontVariant: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "50px", lineHeight: "125%", fontFamily: "Montserrat", textAlign: "start", writingMode: "lr-tb", textAnchor: "start" ,fill:"#003091"}}
              id="path3427" />
          </g>
        </g>
      </svg>
    </span>
  </div>
)

LogoName.propTypes = {
  onClick: PropTypes.func,
  scale: PropTypes.number.isRequired
}

export default LogoName
