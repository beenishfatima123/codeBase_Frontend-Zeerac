import React from "react";
import { useSelector } from "react-redux";
import "../predictions/predictionStyles.css";

const SurveySvg = ({ hovering }) => {
  const { darkMode } = useSelector((state) => state.global);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="555"
      height="555"
      viewBox="0 0 555 555"
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        maxWidth: "100%",
      }}
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_5748"
            data-name="Rectangle 5748"
            width="555"
            height="555"
            transform="translate(755 10497)"
            fill="#fff"
            stroke="#707070"
            strokeWidth="1"
          />
        </clipPath>
      </defs>
      <g
        id="Mask_Group_16"
        data-name="Mask Group 16"
        transform="translate(-755 -10497)"
        clipPath="url(#clip-path)"
      >
        <g
          id="Group_5883"
          data-name="Group 5883"
          transform={
            hovering
              ? "translate(688.267 10424.577)"
              : "translate(740.267 10461.577)"
          }
          className="hoverSvg"
        >
          <g
            id="Group_5881"
            data-name="Group 5881"
            transform="translate(322.875 266.923)"
          >
            <path
              id="Path_26785"
              data-name="Path 26785"
              d="M433.063,389.67a77.3,77.3,0,1,1,77.3,77.3"
              transform="translate(-364.926 -244.232)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
            <path
              id="Path_26786"
              data-name="Path 26786"
              d="M376.363,368.032A112.363,112.363,0,1,1,488.726,480.395"
              transform="translate(-343.286 -222.594)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
            <path
              id="Path_26787"
              data-name="Path 26787"
              d="M322.875,347.619A145.438,145.438,0,1,1,468.313,493.058"
              transform="translate(-322.875 -202.181)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
          </g>
          <g
            id="Group_5882"
            data-name="Group 5882"
            transform="translate(322.875 412.361)"
          >
            <path
              id="Path_26788"
              data-name="Path 26788"
              d="M587.665,589.1a77.3,77.3,0,1,1-77.3-77.3"
              transform="translate(-364.926 -443.66)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
            <path
              id="Path_26789"
              data-name="Path 26789"
              d="M601.089,567.46A112.363,112.363,0,1,1,488.726,455.1"
              transform="translate(-343.286 -422.022)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
            <path
              id="Path_26790"
              data-name="Path 26790"
              d="M613.752,547.047A145.438,145.438,0,1,1,468.313,401.609"
              transform="translate(-322.875 -401.609)"
              fill="none"
              stroke={darkMode ? "#fff" : hovering ? "#fff" : "#014493"}
              strokeMiterlimit="10"
              strokeWidth="11"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SurveySvg;
