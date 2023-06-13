import React from "react";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";

const RegionalSvg = () => {
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="659.414"
      height="116"
      viewBox="0 0 659.414 116"
      style={{ maxWidth: "100%", textTransform: "uppercase" }}
    >
      <g
        id="Group_7039"
        data-name="Group 7039"
        transform="translate(-71.069 -2000)"
      >
        <text
          id="regional"
          transform="translate(223.483 2095)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="95"
          opacity="0.07"
          fontFamily="heavy"
        >
          <tspan x="0" y="0">
            {TextTranslation.regional[langIndex]}
          </tspan>
        </text>
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(71.069 2045.17)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="23"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue BD Std !important"
        >
          <tspan x="0" y="0">
            {TextTranslation.landIs[langIndex]}
          </tspan>
        </text>
        <text
          id="accessible"
          transform="translate(113.483 2093.17)"
          fill="#0ed864"
          fontSize="45"
          fontFamily="heavy"
        >
          <tspan x="0" y="0">
            {TextTranslation.accessible[langIndex]}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default RegionalSvg;
