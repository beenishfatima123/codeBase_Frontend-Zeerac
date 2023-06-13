import React from "react";
import "./servicesStyles.css";

const Constructors = ({ hovering }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="199.635"
      style={{ width: "100%", transition: "0.5s" }}
      height="160.101"
      viewBox="0 0 199.635 160.101"
    >
      <g
        id="Component_90_2"
        data-name="Component 90 – 2"
        transform="translate(0 0.001)"
      >
        <g
          id="Group_5888"
          data-name="Group 5888"
          transform="translate(199.635 -23.851) rotate(90)"
        >
          <path
            id="Path_26800"
            data-name="Path 26800"
            d="M527.495,292.721l29.368-26.7V465.661l-29.368-27.267Z"
            transform="translate(-372.913 -266.026)"
            fill="#014493"
          />
          <path
            id="Path_26801"
            data-name="Path 26801"
            d="M448.954,307.536l22.837-41.51.02,199.635L448.06,424.474Z"
            transform={
              hovering
                ? "translate(-328.913 -266.026)"
                : "translate(-348.616 -266.026)"
            }
            fill="#014493"
            className="hoverSvg"
          />
          <path
            id="Path_26802"
            data-name="Path 26802"
            d="M378.425,309.776l17.455-43.75.02,199.635L378.425,421.41Z"
            fill="#014493"
            transform={
              hovering
                ? "translate(-284.913 -266.026)"
                : "translate(-324.926 -266.026)"
            }
            className="hoverSvg"
          />
          <path
            id="Path_26803"
            data-name="Path 26803"
            d="M317.389,324.221l8.691-58.2.01,199.635-8.7-59.919Z"
            transform={
              hovering
                ? "translate(-243.913 -266.026)"
                : "translate(-293.539 -266.026)"
            }
            fill="#014493"
            className="hoverSvg"
          />
        </g>
      </g>
    </svg>
  );
};

export default Constructors;
