import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import PredictionsSvg from "./PredictionsSvg";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    border: "1px solid #0ed864",
    cursor: "pointer",
    width: 555,
    height: 555,
    position: "relative",
    transition: "0.5s",
    transitionTimingFunction: "ease",
  },
  text: {
    fontSize: 28,
    marginTop: 20,
    marginLeft: 40,
    marginBottom: 0,
  },
  subText: {
    fontSize: 20,
    color: "white",
    maxWidth: 360,
  },
  hoveredContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 40,
    marginBottom: 40,
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "100%",
    },
  },
}));
const PredictionContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  const [hovering, setHovering] = useState(false);
  return (
    <div
      className={classes.container}
      style={{
        background: hovering ? "#134696" : darkMode ? "#303134" : "white",
      }}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <p
        className={classes.text}
        style={{
          color: hovering ? "#0ED864" : darkMode ? "white" : "134696",
        }}
      >
        Predictometer
      </p>
      <Grow in={hovering} {...(hovering ? { timeout: 500 } : {})}>
        <div className={classes.hoveredContent}>
          <p className={classes.subText}>
            Get started with our Predictometer to evaluate a property that best
            suits your needs.
          </p>
          <Button
            sx={{
              height: 40,
              width: 120,
              borderRadius: 20,
              border: "1px solid #FFFFFF",
              fontSize: 14,
              color: "#FFFFFF",
              zIndex: 1200,
            }}
            onClick={() => navigate("/comparison")}
          >
            {TextTranslation.viewAll[langIndex]}
          </Button>
        </div>
      </Grow>
      <PredictionsSvg hovering={hovering} />
      {/* {hovering ? <PredictionHover /> : <PredictionsSvg />} */}
    </div>
  );
};

export default PredictionContainer;
