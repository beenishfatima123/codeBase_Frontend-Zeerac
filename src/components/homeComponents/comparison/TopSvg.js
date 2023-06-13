import React from 'react';
import { useSelector } from 'react-redux';

const TopSvg = () => {
  const { darkMode } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="765.865"
      height="120"
      viewBox="0 0 765.865 120"
      style={{
        marginLeft: 40,
      }}
    >
      <g
        id="Group_7051"
        data-name="Group 7051"
        transform="translate(-149.635 -8893.012)"
      >
        <text
          id="comparison"
          transform="translate(289.5 8991.012)"
          fill={darkMode ? 'white' : '#134696'}
          fontSize="100"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          letterSpacing="-0.07em"
          opacity="0.07"
          fontWeight={'bold'}
        >
          <tspan x="0" y="0">
            COMPARISON
          </tspan>
        </text>
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(149.635 8925.918)"
          fill={darkMode ? 'white' : '#134696'}
          fontSize="26"
          fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            LAND IS
          </tspan>
        </text>
        <text
          id="utility"
          transform="translate(175.169 8971.012)"
          fill="#0ed864"
          fontSize="45"
          fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
          fontWeight={'bold'}
        >
          <tspan x="0" y="0">
            UTILITY
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default TopSvg;
