import React from "react";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";

const InvestmentSvg = () => {
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="706"
      height="139.5"
      viewBox="0 0 706 139.5"
      style={{ maxWidth: "95%" }}
    >
      <g
        id="Group_7047"
        data-name="Group 7047"
        transform="translate(-215 -6208.802)"
      >
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(215 6233.802)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="26"
          fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {TextTranslation.landIs[langIndex]}
          </tspan>
        </text>
        <text
          id="investment"
          transform="translate(272 6326.302)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="100"
          fontFamily="heavy"
          opacity="0.07"
        >
          <tspan x="0" y="0">
            {TextTranslation.investment[langIndex]}
          </tspan>
        </text>
        <text
          id="Tomorrow"
          transform="translate(248.5 6281.302)"
          fill="#0ed864"
          fontSize="45"
          fontFamily="heavy"
        >
          <tspan x="0" y="0">
            {TextTranslation.tomorrow[langIndex]}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default InvestmentSvg;
