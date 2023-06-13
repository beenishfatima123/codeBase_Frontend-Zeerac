import React from "react";
import { makeStyles } from "@mui/styles";
import partnersLeft from "../../../assets/home/partners/partnersLeft.png";
import partnersRight from "../../../assets/home/partners/partnersRight.png";
import PartnersSvg from "./PartnersSvg";
import { useWindowDims } from "../../../utils/useWindowDims";
import PartnersSlider from "./PartnersSLider";
import { useSelector } from "react-redux";
import { CONTENT_WIDTH } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    color: "#75848F",
    fontSize: 22,
    margin: 0,
    width: "90%",
    maxWidth: 650,
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
const PartnersContainer = () => {
  const classes = useStyles();
  const { width } = useWindowDims();

  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <img
          src={partnersLeft}
          alt=""
          className={classes.leftLine}
          style={{ width: width * 0.2 || 300 }}
        />
        <div className={classes.contentContainer}>
          <PartnersSvg />
          <p
            className={classes.text}
            style={{
              color: darkMode ? "white" : "#6B7B88",
            }}
          >
            Grow your personal and professional projects through our partners.
            Our partners will be happy to assist you in all possibilities.
          </p>
        </div>
        <img
          src={partnersRight}
          alt=""
          className={classes.rightLine}
          style={{ width: width * 0.2 || 300 }}
        />
      </div>
      <PartnersSlider />
    </div>
  );
};

export default PartnersContainer;
