import React from 'react';
import { useSelector } from 'react-redux';

const TradingLinesSvg = () => {
  const { darkMode } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1117.941"
      height="131.63"
      viewBox="0 0 1117.941 131.63"
      style={{ maxWidth: '100%', marginLeft: -150 }}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.037"
          y1="-0.321"
          x2="0.983"
          y2="1.201"
          gradientUnits="objectBoundingBox"
        >
          <stop
            offset="0"
            stopColor={darkMode ? 'white' : '#134696'}
            stopOpacity="0"
          />
          <stop offset="0.527" stopColor={darkMode ? 'white' : '#134696'} />
          <stop
            offset="1"
            stopColor={darkMode ? 'white' : '#134696'}
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="-0.027"
          y1="0.634"
          x2="0.983"
          y2="1.201"
          gradientUnits="objectBoundingBox"
        >
          <stop
            offset="0"
            stopColor={darkMode ? 'white' : '#134696'}
            stopOpacity="0"
          />
          <stop offset="0.44" stopColor={darkMode ? 'white' : '#134696'} />
          <stop
            offset="1"
            stopColor={darkMode ? 'white' : '#134696'}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <g
        id="Group_7050"
        data-name="Group 7050"
        transform="translate(203.941 -7906.37)"
      >
        <text
          id="trading"
          transform="translate(458 8016)"
          fill={darkMode ? 'white' : '#134696'}
          fontSize="100"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          opacity="0.07"
          fontWeight={'bold'}
        >
          <tspan x="0" y="0">
            TRADING
          </tspan>
        </text>
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(257 7954)"
          fill={darkMode ? 'white' : '#134696'}
          fontSize="26"
          fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            LAND IS
          </tspan>
        </text>
        <text
          id="profitable"
          transform="translate(291 7998.094)"
          fill="#0ed864"
          fontSize="45"
          fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
          fontWeight={'bold'}
        >
          <tspan x="0" y="0">
            PROFITABLE
          </tspan>
        </text>
        <g
          id="Group_5898"
          data-name="Group 5898"
          transform="translate(-161.333 8076.547) rotate(180)"
        >
          <path
            id="Path_43"
            data-name="Path 43"
            d="M51.883,105.775v9.706H-68.248a71.216,71.216,0,0,1-56.4-28.717l-17.022-22.941a71.261,71.261,0,0,0-56.387-28.717l-8.332-.074-205.434.134a70.723,70.723,0,0,0,1.654-9.662h217a71.335,71.335,0,0,1,56.387,28.732l17.007,22.882a71.246,71.246,0,0,0,56.432,28.7Z"
            transform="translate(-94.576 29.012)"
            fill="url(#linear-gradient)"
          />
          <path
            id="Path_44"
            data-name="Path 44"
            d="M176.785,118.257V127.9H-36.92a70.905,70.905,0,0,1-56.2-28.7l-16.958-22.9a70.878,70.878,0,0,0-55.491-28.7H-315.913A70.5,70.5,0,0,0-311.25,38h149.9A70.965,70.965,0,0,1-105.2,66.7l16.943,22.9a70.98,70.98,0,0,0,56.218,28.792Z"
            transform="translate(-134.177 42.273)"
            fill="url(#linear-gradient-2)"
          />
        </g>
      </g>
    </svg>
  );
};

export default TradingLinesSvg;
