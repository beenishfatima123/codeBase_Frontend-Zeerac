import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import aIGif from "../../../assets/home/aIGif.gif";
import { CONTENT_WIDTH } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "relative",
    margin: "20px 0px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    padding: "0px 10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 37,
    color: "white",
    margin: 0,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "white",
    width: 490,
  },
  videoContainer: {
    maxWidth: "20%",
  },
  gif: {
    height: 399,
    width: 399,
    transform: "rotate(90deg)",
  },
  "@media (max-width: 850px)": {
    innerContainer: {
      flexDirection: "column",
      padding: 10,
      alignItems: "center",
    },
    content: {
      alignItems: "flex-start",
      margin: "10px 20px",
    },
  },
  "@media (max-width: 600px)": {
    title: {
      fontSize: 32,
    },
    description: {
      fontSize: 12,
      width: "90%",
    },
  },
}));
const BannerContainer = () => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div
      className={classes.container}
      style={{ backgroundColor: darkMode ? "#303134" : "#134696" }}
    >
      <div className={classes.innerContainer}>
        <div className={classes.content}>
          <p className={classes.title}>
            ARTIFICIAL <br /> INTELLIGENCE
          </p>
          <p className={classes.description}>
            In addition to our technological advances, Zeerac has a team of
            experienced and qualified professionals who research the market
            extensively to provide you with the most accurate information. Our
            platform is designed to be user-friendly and easy to navigate,
            making your investment decision less daunting.
          </p>
        </div>
        <div className={classes.content}>
          <img src={aIGif} alt="" className={classes.gif} />
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
