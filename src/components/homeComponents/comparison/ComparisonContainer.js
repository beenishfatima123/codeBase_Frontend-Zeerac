import React from "react";
import { makeStyles } from "@mui/styles";
import comparisonLines from "../../../assets/home/comparisonLines.png";
import TopSvg from "./TopSvg";
import PredictionContainer from "./predictions/PredictionsContainer";
import SurveyContainer from "./survey/SurveyContainer";
import { CONTENT_WIDTH } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "100px 0px",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },

  topSection: {
    display: "flex",
    flexDirection: "row",
    margin: "0px 5%",
    position: "relative",
    alignItems: "center",
  },
  leftLine: {
    position: "absolute",
    left: 0,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  text: {
    color: "#75848F",
    fontSize: 22,
    margin: 0,
    maxWidth: 650,
  },
  "@media (max-width: 1024px)": {
    content: {
      flexDirection: "column",
      width: "90%",
      height: 1100,
      alignSelf: "center",
    },
  },
}));
const ComparisonContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <img src={comparisonLines} alt="" className={classes.leftLine} />
        <TopSvg />
      </div>
      <div className={classes.content}>
        <PredictionContainer />
        <SurveyContainer />
      </div>
    </div>
  );
};

export default ComparisonContainer;
