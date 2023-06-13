import React from "react";

const Percentage = ({ style, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="72"
      viewBox="0 0 45 72"
      style={style}
    >
      <text
        id="_"
        data-name="%"
        transform="translate(0 58)"
        fill={color}
        fontSize="54"
        fontFamily="SegoeUI, Segoe UI"
      >
        <tspan x="0" y="0">
          %
        </tspan>
      </text>
    </svg>
  );
};

export default Percentage;
