import React from "react";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";

const PartnersSvg = () => {
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="631.5"
      height="142.406"
      viewBox="0 0 631.5 142.406"
      style={{ maxWidth: "90%", textTransform: "uppercase" }}
    >
      <g
        id="Group_7049"
        data-name="Group 7049"
        transform="translate(-307.5 -7017.985)"
      >
        <text
          id="partners"
          transform="translate(403 7138.392)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="100"
          //fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          //fontWeight={'bold'}
          fontFamily="heavy"
          opacity="0.07"
        >
          <tspan x="0" y="0">
            {TextTranslation.projects[langIndex]}
          </tspan>
        </text>
        <text
          id="Land_is"
          data-name="Land is"
          transform="translate(307.5 7042.985)"
          fill={darkMode ? "white" : "#134696"}
          fontSize="26"
          fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {TextTranslation.landIs[langIndex]}
          </tspan>
        </text>
        <text
          id="together"
          transform="translate(342.5 7089.392)"
          fill="#0ed864"
          fontSize="45"
          // fontFamily="HelveticaNeueLTStd-Hv, Helvetica Neue LT Std !important"
          // fontWeight={'bold'}
          fontFamily="heavy"
        >
          <tspan x="0" y="0">
            {TextTranslation.together[langIndex]}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default PartnersSvg;
