import React from "react";
import { makeStyles } from "@mui/styles";
import agentsTop from "../../assets/defaultAssets/agentsTop.png";
import { TextTranslation } from "../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    height: 250,
    width: "100%",
    marginTop: 10,
    position: "relative",
  },
  topImage: {
    height: 250,
    width: "100%",
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
    objectFit: "cover",
    position: "absolute",
    zIndex: 0,
  },
  headerText: {
    position: "absolute",
    zIndex: 10,
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "light",
    left: "18%",
    top: 130,
    maxWidth: 350,
  },
  "@media (max-width: 900px)": {
    headerText: {
      left: "30%",
    },
  },
  "@media (max-width: 600px)": {
    headerText: {
      left: "20%",
    },
  },
}));

/* AgentsTop is the top image and text diplayed as the cover page on agents page. */
const AgentsTop = ({ agency }) => {
  const classes = useStyles();
  const { langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <img src={agentsTop} alt="" className={classes.topImage} />
      <div className={classes.headerText}>
        <div>
          {agency
            ? TextTranslation.agencyBannerText[langIndex]
            : TextTranslation.agentBannerText[langIndex]}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="550"
        // width={agency ? '710' : '543.156'}
        height="114.217"
        viewBox="0 0 550 114.217"
        style={{
          zIndex: 10,
          position: "absolute",
          top: 10,
          left: -100,
          maxWidth: "100%",
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
            <stop offset="0" stopColor="#0ed864" />
            <stop offset="0.527" stopColor="#0ed864" />
            <stop offset="1" stopColor="#134696" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g
          id="Group_6530"
          data-name="Group 6530"
          transform="translate(121.774 -179.5)"
        >
          <g
            id="Group_5946"
            data-name="Group 5946"
            transform="translate(-121.774 179.5)"
          >
            <path
              id="Path_43"
              data-name="Path 43"
              d="M457.919,79.269v9.585H339.289a70.327,70.327,0,0,1-55.7-28.359L266.781,37.841A70.371,70.371,0,0,0,211.1,9.482l-8.228-.074L0,9.541A69.846,69.846,0,0,0,1.634,0H215.926a70.445,70.445,0,0,1,55.683,28.373l16.795,22.6a70.357,70.357,0,0,0,55.727,28.344Z"
              transform="translate(0 0)"
              fill="url(#linear-gradient)"
            />
            <path
              id="Path_44"
              data-name="Path 44"
              d="M486.548,79.255v9.526H275.511a70.02,70.02,0,0,1-55.5-28.344L203.263,37.826a69.993,69.993,0,0,0-54.8-28.344H0A69.622,69.622,0,0,0,4.6,0H152.629a70.079,70.079,0,0,1,55.458,28.344l16.731,22.611a70.094,70.094,0,0,0,55.517,28.432Z"
              transform="translate(55.608 25.436)"
              fill="url(#linear-gradient)"
            />
          </g>
          <text
            id="AGENT"
            transform="translate(262.382 272.108)"
            fill="#fff"
            fontSize="46"
            fontFamily="heavy"
          >
            <tspan x="-39" y="0">
              {agency
                ? TextTranslation.agency[langIndex]
                : TextTranslation.agent[langIndex]}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AgentsTop;
