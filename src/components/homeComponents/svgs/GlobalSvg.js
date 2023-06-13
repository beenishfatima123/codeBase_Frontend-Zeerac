import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";
const svgVariant = {
  // hidden: { x: "-100vw" },
  // visible: {
  //   x: 0,
  //   transition: { delay: 0.5, type: "spring" },
  // },
};

const pathVariant = {
  // hidden: { opacity: 0, pathLength: 0 },
  // visible: {
  //   opacity: 1,
  //   pathLength: 1,
  //   transition: { delay: 0.5, type: "spring", stiffness: 100 },
  // },
};
const pathVariant2 = {
  // hidden: { opacity: 0, pathLength: 0 },
  // visible: {
  //   opacity: 1,
  //   pathLength: 1,
  //   transition: { delay: 0.5, type: "spring", stiffness: 100 },
  // },
};
const GlobalSvg = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode, langIndex } = useSelector((state) => state.global);

  useEffect(() => {
    function manageScroll() {
      var element = document.querySelector("#global-lines-svg");
      var position = element.getBoundingClientRect();
      if (position.top >= 0 && position.bottom <= window.innerHeight)
        setIsVisible(true);
    }
    window.addEventListener("scroll", manageScroll);
    return () => window?.removeEventListener("scroll", manageScroll);
  }, []);

  return (
    <div id={"global-lines-svg"}>
      {isVisible && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="969.381"
          height="136"
          viewBox="0 0 969.381 136"
          style={{ maxWidth: "100%" }}
          variants={svgVariant}
          initial="hidden"
          animate="visible"
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
              <stop offset="0" stopColor="#134696" stopOpacity="0" />
              <stop offset="0.527" stopColor="#134696" />
              <stop offset="1" stopColor="#134696" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="-0.027"
              y1="0.634"
              x2="0.983"
              y2="1.201"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#134696" stopOpacity="0" />
              <stop offset="0.44" stopColor="#134696" />
              <stop offset="1" stopColor="#134696" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g
            id="Group_7043"
            data-name="Group 7043"
            transform="translate(248.381 -5358)"
          >
            <g id="Group_7040" data-name="Group 7040">
              <g
                id="Group_5877"
                data-name="Group 5877"
                transform="translate(-205.773 5528.177) rotate(180)"
              >
                <motion.path
                  id="Path_43"
                  data-name="Path 43"
                  d="M51.883,105.775v9.706H-68.248a71.216,71.216,0,0,1-56.4-28.717l-17.022-22.941a71.261,71.261,0,0,0-56.387-28.717l-8.332-.074-205.434.134a70.723,70.723,0,0,0,1.654-9.662h217a71.335,71.335,0,0,1,56.387,28.732l17.007,22.882a71.246,71.246,0,0,0,56.432,28.7Z"
                  transform="translate(-94.576 29.012)"
                  fill="url(#linear-gradient)"
                  variants={pathVariant2}
                />
                <motion.path
                  id="Path_44"
                  data-name="Path 44"
                  d="M176.785,118.257V127.9H-36.92a70.905,70.905,0,0,1-56.2-28.7l-16.958-22.9a70.878,70.878,0,0,0-55.491-28.7H-315.913A70.5,70.5,0,0,0-311.25,38h149.9A70.965,70.965,0,0,1-105.2,66.7l16.943,22.9a70.98,70.98,0,0,0,56.218,28.792Z"
                  transform="translate(-134.177 42.273)"
                  fill="url(#linear-gradient-2)"
                  variants={pathVariant}
                />
              </g>
            </g>
            <g id="Group_7042" data-name="Group 7042">
              <text
                id="Land_is"
                data-name="Land is"
                transform="translate(82.893 5383)"
                fill={darkMode ? "#fff" : "#134696"}
                fontSize="26"
                fontFamily="HelveticaNeueLTStd-Lt, Helvetica Neue LT Std !important"
              >
                <tspan x="0" y="0">
                  {TextTranslation.landIs[langIndex]}
                </tspan>
              </text>
              <text
                id="global"
                transform="translate(309 5472)"
                fill={darkMode ? "#fff" : "#134696"}
                fontSize="100"
                opacity="0.07"
                fontFamily="heavy"
              >
                <tspan x="0" y="0">
                  {TextTranslation.global[langIndex]}
                </tspan>
              </text>
              <text
                id="unlimited"
                transform="translate(103 5426.167)"
                fill="#0ed864"
                fontSize="45"
                fontFamily="heavy"
              >
                <tspan x="0" y="0">
                  {TextTranslation.unlimited[langIndex]}
                </tspan>
              </text>
            </g>
          </g>
        </motion.svg>
      )}
    </div>
  );
};

export default GlobalSvg;
