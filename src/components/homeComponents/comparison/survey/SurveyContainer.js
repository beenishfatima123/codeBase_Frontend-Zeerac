import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Button, Grow } from "@mui/material";
import SurveySvg from "./SurveySvg";
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
const SurveyContainer = () => {
  const classes = useStyles();
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
        PROPERTY SURVEY
      </p>

      <Grow in={hovering} {...(hovering ? { timeout: 500 } : {})}>
        <div className={classes.hoveredContent}>
          <p className={classes.subText}>
            Survey any land opportunity and compare with nearby properties to
            get the best deal. We value your time and money.
          </p>
          <Button
            sx={{
              height: 40,
              width: 120,
              borderRadius: 20,
              border: "1px solid #FFFFFF",
              fontSize: 14,
              color: "#FFFFFF",
            }}
          >
            {TextTranslation.viewAll[langIndex]}
          </Button>
        </div>
      </Grow>

      <SurveySvg hovering={hovering} />
    </div>
  );
};

export default SurveyContainer;
