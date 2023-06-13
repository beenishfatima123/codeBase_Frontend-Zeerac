import React from "react";
import { makeStyles } from "@mui/styles";
import auctionsTop from "../../assets/auctions/auctionsTop.png";
import { useWindowDims } from "../../utils/useWindowDims";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../utils/translation";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: 250,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 250,
  },
  "@media (max-width: 1230px)": {
    container: {
      flexDirection: "column",
    },
    image: {
      alignSelf: "flex-end",
    },
  },
}));

/* TopSection displays the header part of auctions/trading page. */
const TopSection = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { langIndex } = useSelector((state) => state.global);
  return (
    <div className={classes.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="795.009"
        height="126.815"
        viewBox="0 0 795.009 126.815"
        style={{
          marginLeft: -130,
          maxWidth: "100%",
          alignSelf: width > 1230 ? "center" : "flex-start",
          textTransform: "uppercase",
        }}
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
            <stop offset="0" stopColor="#134696" stopOpacity="0.4" />
            <stop offset="0.44" stopColor="#134696" />
            <stop offset="1" stopColor="#134696" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g id="auctionSvg" transform="translate(175.045 -159.685)">
          <text
            id="trading"
            transform="translate(373.964 274.5)"
            fill="#134696"
            fontSize="54"
            fontFamily="heavy"
          >
            <tspan x="0" y="0">
              {TextTranslation.trading[langIndex]}
            </tspan>
          </text>
          <g
            id="Group_5946"
            data-name="Group 5946"
            transform="translate(-132.437 329.862) rotate(180)"
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
      <img src={auctionsTop} alt="" className={classes.image} />
      <div
        style={{
          height: 20,
          width: "100%",
          position: "absolute",
          bottom: 0,
          borderBottom: "2px solid #ededed",
        }}
      ></div>
    </div>
  );
};

export default TopSection;
