import React from "react";
import { makeStyles } from "@mui/styles";
import investmentLineLeft from "../../../assets/home/investment/investmentLineLeft.png";
import investmentLineRight from "../../../assets/home/investment/investmentLineRight.png";
import InvestmentSvg from "./InvestmentSvg";

import ContentContainer from "./content/ContentContainer";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../utils/translation";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px 0px",
    position: "relative",
  },
  leftLine: {
    alignSelf: "flex-start",
  },
  rightLine: {
    alignSelf: "flex-end",
  },
  text: {
    color: "#6B7B88",
    fontSize: 22,
    margin: 0,
    maxWidth: 500,
  },
  svgContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
  },
  description: {
    color: "#6B7B88",
    fontSize: 22,
    fontWeight: "lighter",
    width: "95%",
    maxWidth: 500,
    margin: 0,
    marginLeft: -115,
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    svgContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  "@media (max-width: 600px)": {
    description: {
      marginLeft: 0,
    },
  },
}));
const InvestmentContainer = () => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <img src={investmentLineLeft} alt="" className={classes.leftLine} />
        <div className={classes.svgContainer}>
          <InvestmentSvg />
          <p
            className={classes.description}
            style={{
              color: darkMode ? "white" : "#6B7B88",
            }}
          >
            {TextTranslation.makeYourInvestmentSafe[langIndex]}
          </p>
        </div>
        <img src={investmentLineRight} alt="" className={classes.rightLine} />
      </div>
      <ContentContainer />
    </div>
  );
};

export default InvestmentContainer;
